import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components'
import { useQuery, QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import Layout from './components/layout/Layout'
import PageHeader from './components/Header/PageHeader'
import PageFooter from './components/Footer/PageFooter'
import ApiItems from './components/ApiItems/ApiItems'
import TableDialogue from './components/Dialogues/FullscreenTable'
import VisualizationsDialogue from './components/Dialogues/VisualizationsDialogue'
// services
import SwaggerParserService from './services/SwaggerParser'
import LocalStorageService from './services/LocalStorage'
import OpenapiFormatter, { ODCTable } from './services/OpenapiFormatter'
// import LocalStorageService from './services/LocalStorage'
// Context API
import { SpecProvider } from './context/SpecContext'
import { UIProvider } from './context/UIContext';
// types
import { OpenAPIV3 } from 'openapi-types'
import { ODCNavRoute } from './types/Openapi'
// styles
import GlobalStyle from './styles/global'
import odcTheme from './styles/theme'
// config
import config from './mocks/config2.example'


// const swaggerUrl = "https://api.stldata.org/crime/openapi.json"
const uniqueQueryId = 'openapi-source'

const queryCache = new QueryCache()

interface IApiInfo { // store in local storage
  logoUrl?: string
  apiVersion?: string
  openapiVersion?: string // | number
}

// interface IOpenapiV3Document extends OpenAPIV3.Document {
//   "x-logo"?: string
// }

export interface PathsArrayItem extends OpenAPIV3.PathItemObject {
  path: string
}

function App() {

  const swaggerUrl = process.env.REACT_APP_SWAGGER_URL || "";

  const fetchSwaggerData = async () => {
    const swaggerParser = new SwaggerParserService();
    const response = await swaggerParser.validateApi(swaggerUrl)
    return response;
  }

  const { isLoading, isError, data, error } = useQuery(uniqueQueryId, fetchSwaggerData, {
    refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false
  })

  // "paths" contain more data than just "paths"
  // since the "refs" are resolved with swagger-parser, all schemas are nested within these paths.
  // would be a good idea to refactor this later on, so that the object isn't so may layers deep
  // it wouldn't hurt to save some of this in local storage either. tbd.
  const [paths, setPaths] = useState<any>([])
  const [routes, setRoutes] = useState<ODCNavRoute[]>([])
  const [responseTables, setResponseTables] = useState<ODCTable[]>([])
  const [apiInfo, setApiInfo] = useState<IApiInfo | undefined>(undefined)
  const [showTableModal, setShowTableModal] = useState<boolean>(false)
  const [showVizModal, setShowVizModal] = useState<boolean>(false)
  const [modalTableIndex, setModalTableIndex] = useState<number>(-1)
  const [appConfig, setAppConfig] = useState<undefined | typeof config>(undefined)

  useEffect(() => {
    // if local storage has not saved config, save the config
    const localStorage = new LocalStorageService()
    let localConfig = localStorage.getItemFromStorage("odc-config")
    if(!localConfig || localConfig != JSON.stringify(config)) {
      console.log('setting config data in local service')
      localStorage.setItemInStorage("odc-config", config)
      localConfig = localStorage.getItemFromStorage("odc-config")
    }
    try {
      let parsedConfig;
      if(!localConfig) parsedConfig = config
      else parsedConfig = JSON.parse(localConfig)
      console.log('parsed config:', config)
      setAppConfig(parsedConfig)
    } catch (error) {
      console.log('error parsing json config:', error)
      setAppConfig(config)
    }
  }, [])

  useEffect(() => {
    // console.log('swagger data changed:', data)

    if(data && !isError && !error && paths.length < 1) {
      const openapiFormatter = new OpenapiFormatter();

      const formattedPaths = openapiFormatter.formatPaths(data.paths);
      // console.log('paths:', formattedPaths)
      const formattedNavRoutes = openapiFormatter.getNavRoutes(formattedPaths);
      // console.log('navRoutes:', formattedNavRoutes)
      const formattedResponseTables = openapiFormatter.getResponseTables(formattedPaths)
      // console.log('tables:', formattedResponseTables)

      setRoutes(formattedNavRoutes);
      setPaths(formattedPaths)
      setResponseTables(formattedResponseTables)

      let newApiInfo: IApiInfo = {}
      //@ts-ignore
      data.info["x-logo"]?.url && (newApiInfo.logoUrl = data.info["x-logo"].url)
      setApiInfo(newApiInfo);
    }

    return cleanup;
  }, [data, isLoading, isError, error])

  const updateTableData = (data: any, tableId: string) => {
    // should have rows and columns...?
    // or should be an api response in the form array of objects or object
    let tableData = responseTables.find(table => table.id === tableId)
    if(tableData) {
      if(Array.isArray(data)) {
        // replace table.rows with the data, since already array
        setResponseTables(prevTables => {
          return prevTables.map(table => {
            if(table.id === tableId) {
              table.rows = data;
              console.log('data length:', data.length)
            }
            return table;
          })
        })
      }
      else {
        // populate only the first row with response object data
        setResponseTables(prevTables => {
          return prevTables.map(table => {
            if(table.id === tableId) {
              table.rows = []
              table.rows.push(data)
            }
            return table;
          })
        })
      }
    }
  }

  const resetTableRows = (id: string) => {
    // reset the given table's rows to their default types
    const openapiFormatter = new OpenapiFormatter();
    // find the table and schema
    const chosenTable = responseTables.find(responseTable => responseTable.id === id)
    const chosenPath = paths.find((path: any) => path.methods[0].value.operationId === id)
    const chosenSchema = chosenPath.methods[0].value.responses[0].content["application/json"].schema
    if(chosenTable && chosenSchema) {
      const table = openapiFormatter.resetTable(chosenTable, chosenSchema)
      if(table)
        setResponseTables(responseTables.map(responseTable => {
          if(responseTable.id === id)
            responseTable = table
          return responseTable;
        }))
    }
  }

  const showFullscreenTable = (tableId: string) => {
    let foundTableIndex = responseTables.findIndex(table => table.id === tableId)
    if(foundTableIndex < 0) return;
    setModalTableIndex(foundTableIndex)
    setShowTableModal(true)
  }

  const showFullscreenViz = (tableId: string) => {
    let foundTableIndex = responseTables.findIndex(table => table.id === tableId)
    if(foundTableIndex < 0) return;
    setModalTableIndex(foundTableIndex)
    setShowVizModal(true)
  }

  const onCloseTable = () => {
    setModalTableIndex(-1)
    setShowTableModal(false)
    setShowVizModal(false)
  }

  const cleanup = () => {
    // console.log('cleanup App.tsx')
  }

  return (
    <>
      <ReactQueryDevtools initialIsOpen />
      <GlobalStyle />
      <ThemeProvider theme={odcTheme}>
        <SpecProvider>
        <UIProvider>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <Layout
              routes={routes}
              logoUrl={apiInfo?.logoUrl}
            >
              <PageHeader
                loading={isLoading}
                title={data?.info.title || "loading"}
                description={data?.info.description || "loading"}
                version={data?.info.version || "loading"}
              />
              <ApiItems
                isFetching={isLoading}
                apiData={paths}
                tables={responseTables}
                updateTableData={updateTableData}
                resetTableRows={resetTableRows}
                showFullscreenTable={showFullscreenTable}
                showFullscreenViz={showFullscreenViz}
                appConfig={appConfig}
              />
              <PageFooter />
            </Layout>

            {/* Fullscreen Table Dialogue */}
            <TableDialogue
              showModal={showTableModal}
              responseTable={responseTables[modalTableIndex] || undefined}
              onCloseModal={onCloseTable}
            />

            {/* Visualizations Dialogue */}
            <VisualizationsDialogue
              showModal={showVizModal}
              responseTable={responseTables[modalTableIndex] || undefined}
              onCloseModal={onCloseTable}
            />
          </ReactQueryCacheProvider>
        </UIProvider>
        </SpecProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

// const getSwagger = async () => {
//   setLoading(true)
//   const localStorage = new LocalStorageService();
//   const storedData = localStorage.getItemFromStorage('openapi_data')
//   if(storedData) {
//     // set it from storage
//     setSwaggerData(storedData)
//   }
//   else {
//
//   }
//   const swaggerParser = new SwaggerParserService();
//   const urlParsed = await swaggerParser.validateApi(swaggerUrl)
//   console.log('url parsed response:', urlParsed)
//   setLoading(false)
// }
// getSwagger()
