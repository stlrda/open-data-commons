import React, { useState, useEffect } from 'react';
import loadable from '@loadable/component'
import CSSBaseline from '@material-ui/core/CssBaseline'
import { lightTheme, darkTheme } from './styles/mui/theme'
import { ThemeProvider } from '@material-ui/core'
// services
import SwaggerParserService from './services/SwaggerParser'
import LocalStorageService from './services/LocalStorage'
import OpenapiFormatter, { ODCTable } from './services/OpenapiFormatter'
// types
import { OpenAPIV3 } from 'openapi-types'
import { ODCNavRoute } from './types/Openapi'
// config
import config from './mocks/config2.example'
import { Router } from '@reach/router';


// const swaggerUrl = "https://api.stldata.org/crime/openapi.json"
interface IApiInfo { // store in local storage
  logoUrl?: string
  apiVersion?: string
  openapiVersion?: string // | number
}

// interface IOpenapiV3Document extends OpenAPIV3.Document {
//   "x-logo"?: string
// }

const ApiItemsContainer = loadable(() => import('./containers/ApiItemsContainer'))
const Visualizations = loadable(() => import('./containers/Visualizations'))

export interface PathsArrayItem extends OpenAPIV3.PathItemObject {
  path: string
}

function App(props: any) {
  const { api, swaggerUrl } = props

  const [darkMode, setDarkMode] = useState<boolean>(false)

  // Swagger Loading... can make own custom hook for
  const [swaggerLoading, setSwaggerLoading] = useState<boolean>(true)
  const [swaggerErrors, setSwaggerErrors] = useState<any>(null)
  const [swaggerData, setSwaggerData] = useState<any>(null)

  // "paths" contain more data than just "paths"
  // since the "refs" are resolved with swagger-parser, all schemas are nested within these paths.
  // would be a good idea to refactor this later on, so that the object isn't so may layers deep
  // it wouldn't hurt to save some of this in local storage either. tbd.
  const [paths, setPaths] = useState<any>([])
  const [routes, setRoutes] = useState<ODCNavRoute[]>([])
  const [responseTables, setResponseTables] = useState<ODCTable[]>([])
  const [apiInfo, setApiInfo] = useState<IApiInfo | undefined>(undefined)
  const [appConfig, setAppConfig] = useState<undefined | typeof config>(undefined)

  useEffect(() => {
    // if local storage has not saved config, save the config
    const localStorage = new LocalStorageService()
    let localConfig = localStorage.getItemFromStorage("odc-config")
    if(!localConfig || localConfig != JSON.stringify(config)) {
      // console.log('setting config data in local service')
      localStorage.setItemInStorage("odc-config", config)
      localConfig = localStorage.getItemFromStorage("odc-config")
    }
    try {
      let parsedConfig;
      if(!localConfig) parsedConfig = config
      else parsedConfig = JSON.parse(localConfig)
      setAppConfig(parsedConfig)
    } catch (error) {
      console.log('error parsing json config:', error)
      setAppConfig(config)
    }

    const fetchSwaggerData = async () => {
      const swaggerParser = new SwaggerParserService();
      const response = await swaggerParser.validateApi(swaggerUrl)
      return response;
    }

    const getSwagger = async () => {
      setSwaggerLoading(true)

      const response = await fetchSwaggerData()
      console.log('parsed swagger response:', response)

      if(response) {
        if(swaggerErrors) setSwaggerErrors(null)
        setSwaggerData(response)
      }
      else
        setSwaggerErrors("swagger url could not be parsed")

      setSwaggerLoading(false)
    }

    getSwagger()
  }, [])

  useEffect(() => {
    if(swaggerData && !swaggerErrors && paths.length < 1) {
      const openapiFormatter = new OpenapiFormatter();

      if(swaggerData.paths) {
        const formattedPaths = openapiFormatter.formatPaths(swaggerData.paths);
        setPaths(formattedPaths)
        // console.log('paths:', formattedPaths)
        const formattedNavRoutes = openapiFormatter.getNavRoutes(formattedPaths);
        // console.log('navRoutes:', formattedNavRoutes)
        const formattedResponseTables = openapiFormatter.getResponseTables(formattedPaths)
        // console.log('tables:', formattedResponseTables)
        setRoutes(formattedNavRoutes);
        setResponseTables(formattedResponseTables)
      }
      else {
        console.log('swagger data paths undefined')
        console.log('swagger data:', swaggerData)
      }

      let newApiInfo: IApiInfo = {}
      //@ts-ignore
      swaggerData.info["x-logo"]?.url && (newApiInfo.logoUrl = swaggerData.info["x-logo"].url)
      setApiInfo(newApiInfo);
    }

    return cleanup;
  }, [swaggerData, swaggerErrors, swaggerLoading])

  const cleanup = () => {
    // console.log('cleanup App.tsx')
  }

  // Context API good for managing modal states if applicable

  return (
    <>
      <CSSBaseline />
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Router>
          <ApiItemsContainer
            default
            path="/"
            responseTables={responseTables}
            appConfig={appConfig}
            routes={routes}
            apiInfo={apiInfo}
            paths={paths}
            swaggerData={swaggerData}
            updateResponseTables={(data) => setResponseTables(data)}
          />
          <Visualizations path="/visualizations" />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
