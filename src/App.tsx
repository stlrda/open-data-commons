import React, { useState, useEffect, useCallback } from 'react';
import Loadable from 'react-loadable'
import CSSBaseline from '@material-ui/core/CssBaseline'
// import ApiItem from './containers/ApiItem'
import Loading from './containers/new-components/Loading'
import BaseLayout from './containers/BaseLayout'
// import { lightTheme, darkTheme } from './styles/mui/theme'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
// services
import SwaggerParserService from './services/SwaggerParser'
import LocalStorageService from './services/LocalStorage'
import OpenapiFormatter, { ODCTable } from './services/OpenapiFormatter'
// types
import { OpenAPIV3 } from 'openapi-types'
import { ODCNavRoute } from './types/Openapi'
// config
import config from './mocks/config2.example'
import useEventListener from './utils/useEventListener'


// const swaggerUrl = "https://api.stldata.org/crime/openapi.json"
interface IApiInfo { // store in local storage
  logoUrl?: string
  apiVersion?: string
  openapiVersion?: string // | number
}

// interface IOpenapiV3Document extends OpenAPIV3.Document {
//   "x-logo"?: string
// }

// const BaseLayout = Loadable({
//   loader: () => import('./containers/BaseLayout'),
//   loading: Loading,
//   delay: 300,
// })

const ApiItems = Loadable({
  loader: () => import('./containers/ApiItems'),
  loading: Loading,
  delay: 300
})
const ApiItem = Loadable({
  loader: () => import('./containers/ApiItem'),
  loading: Loading,
  delay: 300,
})

const Visualizations = Loadable({
  loader: () => import('./containers/Visualizations'),
  loading: Loading,
  delay: 300,
})

const TabularData = Loadable({
  loader: () => import('./containers/TabularData'),
  loading: Loading,
  delay: 300,
})

const DeveloperMode = Loadable({
  loader: () => import('./containers/DeveloperMode'),
  loading: Loading,
  delay: 300,
})

// const NotFound = Loadable({
//   loader: () => import('./containers/new-components/NotFound'),
//   loading: Loading,
//   delay: 300,
// })


export interface PathsArrayItem extends OpenAPIV3.PathItemObject {
  path: string
}

function App(props: any) {
  const { api, swaggerUrl } = props

  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [currentRouteData, setCurrentRouteData] = useState<any>(null)

  const hashHandler = useCallback((event: any) => {
    let hash = location.hash
    console.log('hash on hashchange:', hash)

    let hashId = hash.substring(1)

    console.log('hash id on hashchange:', hashId)

    // Needs to match hash to the operation id
    if(paths) {
      let foundRoute = paths.find((path: any) => path.methods[0].value.operationId == hashId)
      // let foundRoute = routes.find(route => route.operationId == hashId)
      if(foundRoute) {
        console.log('found route:', foundRoute)
        // set route data in state
        // can use this or the index of this route in paths, using findIndex()
        setCurrentRouteData(foundRoute)
        setActivePanelIndex(1)
      }
      else
        console.log('did not find route')
    }
    else
      console.log('paths/swagger data undefined')
  }, [])

  useEventListener('hashchange', hashHandler)

  // Swagger Loading... can make own custom hook for
  const [swaggerLoading, setSwaggerLoading] = useState<boolean>(true)
  const [swaggerErrors, setSwaggerErrors] = useState<any>(null)
  const [swaggerData, setSwaggerData] = useState<any>(null)

  // Use as TS Enum not number
  const [activePanelIndex, setActivePanelIndex] = useState<number>(0)

  // "paths" contain more data than just "paths"
  // since the "refs" are resolved with swagger-parser, all schemas are nested within these paths.
  // would be a good idea to refactor this later on, so that the object isn't so may layers deep
  // it wouldn't hurt to save some of this in local storage either. tbd.
  const [paths, setPaths] = useState<any>([])
  const [routes, setRoutes] = useState<ODCNavRoute[]>([])
  const [responseTables, setResponseTables] = useState<ODCTable[]>([])
  const [apiInfo, setApiInfo] = useState<IApiInfo | undefined>(undefined)
  const [appConfig, setAppConfig] = useState<undefined | typeof config>(undefined)

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  })

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

  const getPanel = (index: number) => {
    switch(index) {
      case 0:
        return <ApiItems paths={paths} />
      case 1:
        return <ApiItem routeData={currentRouteData} />
      case 2:
        return <Visualizations />
      case 3:
        return <TabularData />
      case 4:
        return <DeveloperMode />
      default:
        return <ApiItems paths={paths} />
    }
  }

  const changeActivePanelIndex = (index: number) => setActivePanelIndex(index)

  // Context API good for managing modal states if applicable

  return (
    <>
      <CSSBaseline />
      <ThemeProvider theme={theme}>
        {/* <SpecProvider /> */}
        {/* Config Provider (or useConfig? or both are needed?) */}
        <BaseLayout
          darkMode={darkMode}
          routes={routes}
          activePanelIndex={activePanelIndex}
          changeActivePanelIndex={changeActivePanelIndex}
          toggleDarkMode={() => setDarkMode(prevMode => !prevMode)}
        >
          {getPanel(activePanelIndex)}
          {/* <NotFound default /> */}
          {/* <ApiItemsContainer
            path="/docs"
            responseTables={responseTables}
            appConfig={appConfig}
            routes={routes}
            apiInfo={apiInfo}
            paths={paths}
            swaggerData={swaggerData}
            updateResponseTables={(data) => setResponseTables(data)}
          /> */}
        </BaseLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
