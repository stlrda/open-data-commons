import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components'
import { useQuery, useMutation, useQueryCache, QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import Layout from './components/layout/Layout'
import PageHeader from './components/Header/PageHeader'
import ApiItems from './components/ApiItems/ApiItems'
// import Parser from './components/ParseApi/Parser'
// services
import SwaggerParserService from './services/SwaggerParser'
import LocalStorageService from './services/LocalStorage'
import GlobalStyle from './styles/global'
import odcTheme from './styles/theme'

const swaggerUrl = "https://api.stldata.org/crime/openapi.json"
const uniqueQueryId = 'openapi-source'

const queryCache = new QueryCache()

function App() {
  const fetchSwaggerData = async () => {
    const swaggerParser = new SwaggerParserService();
    const response = await swaggerParser.validateApi(swaggerUrl)
    return response;
  }

  const { isLoading, isError, data, error } = useQuery(uniqueQueryId, fetchSwaggerData)

  useEffect(() => {
    console.log('swagger data changed:', data)
    console.log('swagger error changed:', error)
    console.log('swagger isLoading changed:', isLoading)
    console.log('swagger isError changed:', isError)


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
        <Layout>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <PageHeader />
            <ApiItems
              isFetching={isLoading}
              swaggerData={data}
            />
          </ReactQueryCacheProvider>
        </Layout>
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
