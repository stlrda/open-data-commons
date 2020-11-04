import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components'
import { useQuery, QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import Layout from './components/layout/Layout'
import PageHeader from './components/Header/PageHeader'
import PageFooter from './components/Footer/PageFooter'
import ApiItems from './components/ApiItems/ApiItems'
import { OpenAPIV3 } from 'openapi-types'
import { ODCNavRoute } from './types/Openapi'
// services
import SwaggerParserService from './services/SwaggerParser'
import OpenapiFormatter from './services/OpenapiFormatter'
// import LocalStorageService from './services/LocalStorage'
// Context API
import { SpecProvider } from './context/SpecContext'
import GlobalStyle from './styles/global'
import odcTheme from './styles/theme'


const swaggerUrl = "https://api.stldata.org/crime/openapi.json"
const uniqueQueryId = 'openapi-source'

const scrollContainerId = "#odc-scroll-container"

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

  const { isLoading, isError, data, error } = useQuery(uniqueQueryId, fetchSwaggerData)

  // "paths" contain more data than just "paths"
  // since the "refs" are resolved with swagger-parser, all schemas are nested within these paths.
  // would be a good idea to refactor this later on, so that the object isn't so may layers deep
  // it wouldn't hurt to save some of this in local storage either. tbd.
  const [paths, setPaths] = useState<any>([])
  const [routes, setRoutes] = useState<ODCNavRoute[]>([])
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined)
  const [apiInfo, setApiInfo] = useState<IApiInfo | undefined>(undefined)

  // Old way (use as fallback)
  // window.addEventListener('scroll', (event) => {
  //   const element = document.getElementById('#odc-scroll-container')
  //   const position = element?.getBoundingClientRect();
  //   if(position && position.top >= 0) {
  //     console.log('top of element is in the screen with position:', position)
  //     // set the active window.url, ... will I need to get Y offset for element?
  //     // TODO: be able to print this element position's id
  //   }
  // })

  useEffect(() => {
    console.log('swagger data changed:', data)
    console.log('swagger error changed:', error)
    console.log('swagger isLoading changed:', isLoading)
    console.log('swagger isError changed:', isError)

    if(data && !isError && !error) {
      const openapiFormatter = new OpenapiFormatter();
      const paths = openapiFormatter.formatPaths(data.paths);
      console.log('paths:', paths)
      const navRoutes = openapiFormatter.getNavRoutes(paths);
      console.log('navRoutes:', navRoutes)
      setRoutes(navRoutes);
      setPaths(paths)

      let newApiInfo: IApiInfo = {}
      //@ts-ignore
      data.info["x-logo"]?.url && (newApiInfo.logoUrl = data.info["x-logo"].url)
      setApiInfo(newApiInfo);
    }

    return cleanup;
  }, [data, isLoading, isError, error])

  const cleanup = () => {
    console.log('cleanup component')
  }

  return (
    <>
      <ReactQueryDevtools initialIsOpen />
      <GlobalStyle />
      <ThemeProvider theme={odcTheme}>
        <SpecProvider>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <Layout
              routes={routes}
              scrollContainerId={scrollContainerId}
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
              />
              <PageFooter />
            </Layout>
          </ReactQueryCacheProvider>
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
