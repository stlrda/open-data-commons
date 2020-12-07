import React, { useState, useEffect, useRef, useReducer } from 'react'
import styled from 'styled-components'
import {
  Dialog,
  Classes,
  Spinner,
  Tabs,
  Tab,
  Card,
  Elevation,
  ButtonGroup,
  Alignment,
  Button
} from '@blueprintjs/core'
import BarChartViz from '../../visualizations/BarChart/BarChart'
import PieChartViz from '../../visualizations/PieChart/PieChart'
import GeoMapViz, { GeoData } from '../../visualizations/GeoMap/GeoMap'
import { DataCommonsConfig } from '../../../mocks/config2'
import DataCalculations from '../../../services/DataCalculations'
import { ODCTable } from '../../../services/OpenapiFormatter'

interface IConfigContextState {
  config?: DataCommonsConfig.ApiItemConfig
}

interface ISetConfigAction {
  readonly type: "SET_CONFIG",
  config: DataCommonsConfig.ApiItemConfig
}

type IConfigContextActions = ISetConfigAction

function useItemConfig(initialState: IConfigContextState) {
  let [state, dispatch] = useReducer((state: IConfigContextState, action: IConfigContextActions) => {
    switch(action.type) {
      case "SET_CONFIG":
        return {...state, config: action.config }
      default:
        return state;
    }
  }, initialState)

  return [state, dispatch]
}

export interface VisualizationsDialogueProps {
  showModal: boolean
  responseTable?: ODCTable // data
  config?: DataCommonsConfig.ApiItemConfig // can trim this down
  onCloseModal: () => void
}

const VisualizationsDialogue: React.FC<VisualizationsDialogueProps> = ({
  showModal,
  responseTable,
  config,
  onCloseModal,
}) => {

  useEffect(() => {
    console.log('response table:', responseTable)
    console.log('config:', config)
  }, [responseTable, config])

  let dataService: any

  // const [visualizations, setVisualizations] = useState<any[]>([])
  const [chartData, setChartData] = useState<any>(undefined)
  const [keys, setKeys] = useState<string[] | undefined>(undefined)
  const [selectedTab, setSelectedTab] = useState<string>("")
  const [geoData, setGeoData] = useState<GeoData[] | null>(null)

  const initialState: IConfigContextState = {
    config: config,
  }

  const [itemState, dispatch] = useItemConfig(initialState)

  useEffect(() => {
    if (!responseTable) return

    dataService = new DataCalculations(responseTable)

    // set keys from columns
    console.log('data changed:', responseTable)
    let columnKeys = Object.keys(responseTable.columns)
    setKeys(columnKeys)
    setSelectedTab(columnKeys[0])

    const getData = () => {
      console.log('getting data from service')
      const data = dataService.getDataValues()
      console.log('data from service:', data)
      setChartData(data)
    }

    getData()

    return () => {
      setGeoData(null)
    }
  }, [responseTable])

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId)
  }

  const getVisualizations = (field: string, data: any, index: number, formatData?: DataCommonsConfig.Response) => {
    console.log('getting viz for this data:')
    console.log('field:', field)
    console.log('data:', data) // name, type, value
    console.log('format data:', formatData)

    let visualizations: any = [] // will be set of visualizations to render

    // Handle Geo Case
    if(formatData) {
      if(formatData.format) {
        // warning: this will not support multiple lat/lon in the same response
        if(formatData.format === "geo") {
          console.log('pushing geomap viz')
          let newGeoData;
          visualizations.push(<div>geo</div>)

          if(!geoData) {
            let responseData = config!.responses![index]
            if(responseData)
              console.log('config data for response item:', responseData)

            console.log('response table data:', responseTable)

            // for each item in responseTable.rows
              // return object with lat and lon
              // only if there is a lat and lon

            if(responseTable!.rows.length) {
              let filteredData = responseTable!.rows;
              // if(Object.keys(responseTable!.columns).length > 2) {
              //   filteredData = responseTable!.rows.map(row => {
              //     return {
              //       lat: row.lat,
              //       lng: row.lon || row.lng // TODO: specify one of these?
              //     }
              //   })
              // }
              filteredData = responseTable!.rows.map(row => {
                let { lon, ...rest} = row;
                return {
                  ...rest,
                  lng: row.lon || row.lng,
                }
              })

              filteredData = filteredData.filter(row => row.lat && row.lng)

              console.log('filtered data:', filteredData)

              setGeoData(filteredData as GeoData[])

              newGeoData = filteredData;
            }
          }

          visualizations.push(
            <GeoMapViz
              scrollWheelZoom={true}
              geoData={(newGeoData as GeoData[]) || geoData}
            />
          )
          return visualizations;

            // let latData, lonData;
            // let currentResponse = config!.responses![index]
            // if(currentResponse && Object.keys(currentResponse).length) {
            //   if(formatData.field === "lon") {
            //     lonData = data.value;
            //     //@ts-ignore
            //     latData = currentResponse.find((item: any) => item.field === "lat")
            //     if(!latData) console.log('lat data not found! Error')
            //   }
            //   else if(formatData.field === "lat") {
            //     latData = data.value;
            //     //@ts-ignore
            //     lonData = currentResponse.find((item: any) => item.field === "lon")
            //     if(!lonData) console.log('lon data not found! Error')
            //   }
            //   else {
            //     console.log('something went wrong')
            //   }
            //   // newGeoData = dataService.getGeoData(latData, lonData)
            //   setGeoData(newGeoData)
            // }
            // else console.log('no geo data to be found')
          // visualizations.push(
          //   <GeoMapViz
          //     scrollWheelZoom={true}
          //     geoData={newGeoData ? newGeoData : geoData}
          //   />
          // )
          // }
          // setUsedGeo(true)
          // return visualizations;
        }

        switch(formatData.format) {
          case "date":
            visualizations.push(<div key={visualizations.length}>date viz go here</div>)
            break;
          case "time":
            visualizations.push(<div key={visualizations.length}>time viz go here</div>)
            break;
          case "category":
            visualizations.push(<div key={visualizations.length}>this is a category field</div>)
            break;
          case "number":
            visualizations.push(<div key={visualizations.length}>this is a number field</div>)
            break;
          case "string":
            visualizations.push(<div key={visualizations.length}>this is a string field</div>)
            break;
          default:
            console.log('format data option not recognized. resorting to default')
            break;
        }
      }
      if(formatData!.identifier) {
        visualizations.push(<div key={visualizations.length}>this is an identifier field</div>)
      }
      if(formatData!.category) {
        visualizations.push(<div key={visualizations.length}>this is a category field</div>)
      }
      if(formatData!.numericCategory) {
        visualizations.push(<div key={visualizations.length}>this is a numeric category field</div>)
      }
    }

    switch(data.type) {
      case "number": case "integer": case "float": case "double": case "long":
        visualizations.push(<BarChartViz key={visualizations.length} height={500} width={500} chartData={data} />)
        break;
      case "string": case "boolean":
        visualizations.push(<PieChartViz key={visualizations.length} height={400} width={800} data={data.value} />)
        break;
      default:
        console.log('unrecognized chart data type:', data.type)
        break;
    }

    if(visualizations.length < 1)
      visualizations.push(<div key={0}>unrecognized chart type</div>)

    return visualizations
  }

  const getVizPanel = (field: string, index: number, formatData?: DataCommonsConfig.Response) => {
    if (!chartData)
      return (
        <div>
          <p>chart data or data service undefined</p>
        </div>
      )

    // let VizComponent: any; // React component

    let data = chartData[field] || undefined

    if (!data) {
      console.log('data type not found')
      return <div>data type not found</div>
    } else console.log('data:', data)

    return (
      <VizPanel_Styled className="viz-panel-inner">
        <div className="panel-viz">
          <h1 className="panel-title">{field}</h1>
          {getVisualizations(field, data, index, formatData )}
          {/* {[<div key={1}>a</div>, <div key={2}>b</div>, <div key={3}>c</div>]} */}
        </div>

          <div className="panel-details-card">
            <h3>Data at a Glance</h3>
            {/* {calculations && calculations[]} */}
            <p style={{ margin: 0 }}>Details Here for field: {field}</p>
          </div>
      </VizPanel_Styled>
    )
  }

  return (
    <Dialog_Styled
      isOpen={showModal}
      className="dialogue-body"
      icon="th-list"
      onClose={onCloseModal}
      title={
        <div style={{display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent:'space-between', paddingRight: 12}}>
          <h4 className="bp3-heading" style={{flex: 1}}>
            {responseTable?.id ? responseTable.id : 'Data Visualizations: '}
          </h4>
          <ButtonGroup vertical={false} alignText={Alignment.CENTER}>
            <Button minimal icon="settings">Settings</Button>
            <Button minimal icon="info-sign">About</Button>
            <Button minimal icon="list-detail-view">View All</Button>
          </ButtonGroup>
        </div>
      }
      autoFocus
      canEscapeKeyClose
      canOutsideClickClose
      enforceFocus
      lazy
      usePortal
      // portalContainer
    >
      {!keys || !responseTable || !chartData ? (
        <Spinner />
      ) : (
        <div className={Classes.DIALOG_BODY}>
          <div className="modal-inner">
            {responseTable ? (
              <div className="visualizations-container">
                {/* Sidebar */}
                <Tabs
                  id="VisualizationTabs"
                  selectedTabId={selectedTab}
                  vertical
                  renderActiveTabPanelOnly
                  onChange={handleTabChange}
                >
                  {/* Overview tab */}
                  <Tab
                    key="odc_overview"
                    id="odc_overview"
                    title="Overview"
                    panel={
                      <VizPanel_Styled className="viz-panel-inner">
                        <h1 className="panel-title">Overview</h1>

                        <div className="overview-cards-container">
                          {/* Card Masonry / Grid */}
                          {keys.map((option, index: number) => {
                            let formatData = config ? config.responses![index] : undefined
                            console.log('format data:', formatData)
                            if(!formatData) {
                              return (
                                <Card elevation={Elevation.TWO} key={option} className="overview-card">
                                  <h3>{option}</h3>
                                </Card>
                              )
                            }
                            return (
                              <Card elevation={Elevation.TWO} key={option} className="overview-card">
                                <h3>{option}</h3>
                                {Object.keys(formatData).map(key => (
                                  // @ts-ignore
                                  <p key={key}>{key}: {formatData[key].toString()}</p>
                                ))}
                              </Card>
                            )
                          })}
                        </div>
                      </VizPanel_Styled>
                    }
                  />
                  {keys.map((option, index) => {
                    let formatData = config ? config.responses![index] : undefined
                    console.log('format data:', formatData)
                    return (
                      <Tab
                        key={option}
                        id={option}
                        title={option}
                        //@ts-ignore
                        panel={getVizPanel(option, index, formatData )}
                      />
                    )
                  })}
                </Tabs>

                {/* Main Content */}
                {/* <div className="modal-main-content">
                <h3>Visualizations</h3>

                D3 Viz. Stuff:
                <p>[your viz here]</p>
              </div> */}
              </div>
            ) : (
              // Loading Indicator
              <Spinner />
            )}
          </div>
        </div>
      )}
    </Dialog_Styled>
  )
}

export default VisualizationsDialogue

// interface VizPanelProps {
//   option: IVizOption
//   data: ODCTable
// }

const Dialog_Styled = styled(Dialog)`
  width: 90%;
  height: 95vh;
  margin: auto;

  .table-toolbar {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 5px;
  }
`
const VizPanel_Styled = styled.div`
  padding-left: 10px;
  padding-right: 10px;

  .panel-title {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 30px;
  }

  .panel-details-card {
    margin-bottom: 30px;
    margin-top: 20px;
  }

  .panel-details-card {
    margin-left: 20px;
    width: 100%;
    height: 100%;
    display: block;
  }

  .overview-cards-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .overview-card {
      margin-right: 10px;

      h3 { margin-top: 0; }
    }
  }
`

// const VizPanel: React.FC<VizPanelProps> = ({
//   option,
//   data
// }) => {

//   return (
//     <VizPanel_Styled className="viz-panel-inner">
//       <h1 className="panel-title">{option.title}</h1>

//       <BarChartViz
//         height={500}
//         width={500}
//         data={data}
//       />
//     </VizPanel_Styled>
//   )
// }

// const VisualizationsDialogue: React.FC<Props> = ({
//   showModal,
//   responseTable,
//   onCloseModal,
// }) => {
//   const [visualizations, setVisualizations] = useState<any[]>([])
//   const [selectedTab, setSelectedTab] = useState<string>(defaultVizOption)

//   const handleTabChange = (tabId: string) => {
//     setSelectedTab(tabId)
//   }

//   const getVizPanel = (option: any) => {
//     if(!responseTable) return <div><p>Loading Data</p></div>

//     let VizComponent: any; // React component

//     switch(option.id) {
//       case "histogram":
//         VizComponent = (
//           <BarChartViz
//             height={500}
//             width={500}
//             data={responseTable}
//           />
//         )
//         break;
//       case "pie-chart":
//         VizComponent = <div><p>Hello Pie Chart</p></div>
//         break;
//       default:
//         VizComponent = <div><p>No Visualization Selected</p></div>
//     }

//     return (
//       <VizPanel_Styled className="viz-panel-inner">
//         <h1 className="panel-title">{option.title}</h1>

//         {VizComponent}
//       </VizPanel_Styled>
//     )
//   }

//   return (
//     <Dialog
//       isOpen={showModal}
//       className=""
//       style={{width: "90%", height: "95vh", margin: "auto"}}
//       icon="th-list"
//       onClose={onCloseModal}
//       title={responseTable?.id ? responseTable.id : "Data Visualizations: "}
//       autoFocus
//       canEscapeKeyClose
//       canOutsideClickClose
//       enforceFocus
//       lazy
//       usePortal
//       // portalContainer
//     >
//       <div className={Classes.DIALOG_BODY}>
//         {/* Toolbar Here: */}
//         <div className="table-toolbar">

//         </div>

//         <div className="modal-inner">
//           {responseTable ? (
//             <div className="visualizations-container">
//               {/* Sidebar */}
//               <Tabs
//                 id="VisualizationTabs"
//                 selectedTabId={selectedTab}
//                 vertical
//                 renderActiveTabPanelOnly
//                 onChange={handleTabChange}
//               >
//                 {vizOptions.map(option => (
//                   <Tab
//                     key={option.id}
//                     id={option.id}
//                     title={option.title}
//                     //@ts-ignore
//                     panel={getVizPanel(option)}
//                   />
//                 ))}
//               </Tabs>

//               {/* Main Content */}
//               {/* <div className="modal-main-content">
//                 <h3>Visualizations</h3>

//                 D3 Viz. Stuff:
//                 <p>[your viz here]</p>
//               </div> */}
//             </div>
//           ) : (
//             // Loading Indicator
//             <Spinner />
//           )}
//         </div>
//       </div>
//     </Dialog>
//   )
// }
