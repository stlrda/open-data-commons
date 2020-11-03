import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components'
import { useQuery, QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import Layout from './components/layout/Layout'
import PageHeader from './components/Header/PageHeader'
import ApiItems from './components/ApiItems/ApiItems'
// import Parser from './components/ParseApi/Parser'
import { OpenAPIV3 } from 'openapi-types'
import { ODCNavRoute } from './types/Openapi'
// services
import SwaggerParserService from './services/SwaggerParser'
import OpenapiFormatter from './services/OpenapiFormatter'
// import LocalStorageService from './services/LocalStorage'
import GlobalStyle from './styles/global'
import odcTheme from './styles/theme'

const swaggerUrl = "https://api.stldata.org/crime/openapi.json"
const uniqueQueryId = 'openapi-source'

const queryCache = new QueryCache()

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
        <ReactQueryCacheProvider queryCache={queryCache}>
          <Layout routes={routes} logoUrl={logoUrl} >
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
          </Layout>
        </ReactQueryCacheProvider>
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
