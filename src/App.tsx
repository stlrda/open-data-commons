import React, { useState, useEffect, useContext } from 'react';
import { ThemeProvider } from 'styled-components'
import { useQuery, QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import Layout from './components/layout/Layout'
import PageHeader from './components/Header/PageHeader'
import PageFooter from './components/Footer/PageFooter'
import ApiItems from './components/ApiItems/ApiItems'
// services
import SwaggerParserService from './services/SwaggerParser'
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


const swaggerUrl = "https://api.stldata.org/crime/openapi.json"
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


  useEffect(() => {
    console.log('swagger data changed:', data)

    if(data && !isError && !error && paths.length < 1) {
      const openapiFormatter = new OpenapiFormatter();

      const formattedPaths = openapiFormatter.formatPaths(data.paths);
      console.log('paths:', formattedPaths)
      const formattedNavRoutes = openapiFormatter.getNavRoutes(formattedPaths);
      console.log('navRoutes:', formattedNavRoutes)
      const formattedResponseTables = openapiFormatter.getResponseTables(formattedPaths)
      console.log('tables:', formattedResponseTables)

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

  const cleanup = () => {
    console.log('cleanup App.tsx')
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
                resetTableRows={resetTableRows}
              />
              <PageFooter />
            </Layout>
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
