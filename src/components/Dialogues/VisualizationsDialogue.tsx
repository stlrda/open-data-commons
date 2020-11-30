import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Dialog, Classes, Spinner, Tabs, Tab } from '@blueprintjs/core'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Legend, Bar, CartesianGrid, Tooltip } from 'recharts'
import DataCalculations from '../../services/DataCalculations'
import { ODCTable } from '../../services/OpenapiFormatter'

interface IVizOption {
  id: string // can be enum
  title: string
}

const vizOptions: IVizOption[] = [
  {
    id: 'histogram',
    title: "Histogram",
  },
  {
    id: 'pie-chart',
    title: "Pie Chart",
  }
]

const defaultVizOption = "histogram"

interface Props {
  showModal: boolean
  responseTable?: ODCTable // data
  onCloseModal: () => void
}

const VisualizationsDialogue: React.FC<Props> = ({
  showModal,
  responseTable,
  onCloseModal,
}) => {
  let dataService: any;

  const [visualizations, setVisualizations] = useState<any[]>([])
  const [chartData, setChartData] = useState<any>(undefined)
  const [keys, setKeys] = useState<string[] | undefined>(undefined)
  const [selectedTab, setSelectedTab] = useState<string>(defaultVizOption)

  useEffect(() => {
    if(!responseTable) return;

    dataService = new DataCalculations(responseTable);

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

    getData();
  }, [responseTable])

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId)
  }

  const getVizPanel = (field: string) => {
    if(!chartData) return <div><p>chart data or data service undefined</p></div>

    // let VizComponent: any; // React component

    let data = chartData[field] || undefined

    if(!data) {
      console.log('data type not found')
      return <div>data type not found</div>
    }
    else console.log('data:', data)

    return (
      <VizPanel_Styled className="viz-panel-inner">
        <h1 className="panel-title">{field}</h1>
        <BarChartViz
          height={500}
          width={500}
          chartData={data}
        />
      </VizPanel_Styled>
    )
  }

  return (
    <Dialog
      isOpen={showModal}
      className=""
      style={{width: "90%", height: "95vh", margin: "auto"}}
      icon="th-list"
      onClose={onCloseModal}
      title={responseTable?.id ? responseTable.id : "Data Visualizations: "}
      autoFocus
      canEscapeKeyClose
      canOutsideClickClose
      enforceFocus
      lazy
      usePortal
      // portalContainer
    >
      {!keys || !responseTable || !chartData ? <Spinner /> : (
      <div className={Classes.DIALOG_BODY}>
        {/* Toolbar Here: */}
        <div className="table-toolbar">

        </div>

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

                      <BarChartViz
                        height={500}
                        width={500}
                        chartData={{name: "overview", value: [{name: "overview", value: 20},{name: "overview", value: 15}, {name: "overview", value: 10}]}}
                      />
                    </VizPanel_Styled>
                  }
                />
                {keys.map(option => (
                  <Tab
                    key={option}
                    id={option}
                    title={option}
                    //@ts-ignore
                    panel={getVizPanel(option)}
                  />
                ))}
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
    </Dialog>
  )
}

export default VisualizationsDialogue

interface VizPanelProps {
  option: IVizOption
  data: ODCTable
}

const VizPanel_Styled = styled.div`
  padding-left: 10px;
  padding-right: 10px;

  .panel-title {
    text-align: center;
  }
`

interface BarChartVizProps {
  width: number | string
  height: number | string
  chartData: {
    // [fieldName: string]: {
      value: any
      name?: string
      type?: string
    // }
  }
}

const BarChartViz: React.FC<BarChartVizProps> = ({
  width,
  height,
  chartData,
  ...props
}) => {
  const barFillColor = "#8884d8"

  if(!chartData) return <Spinner />

  return (
    // <ResponsiveContainer width={width} height={height}>
    // @ts-ignore
      <BarChart width={width} height={height} data={chartData.value} {...props}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
        {/* {chartData["lon"].map((item: number, index: number) => ( */}
          <Bar dataKey="value" fill={barFillColor} />
        {/* ))} */}
      </BarChart>
    // </ResponsiveContainer>
  )
}

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
