import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import PageHeader from '../components/Header/PageHeader'
import PageFooter from '../components/Footer/PageFooter'
import ApiItems from '../components/ApiItems/ApiItems'
import TableDialogue from '../components/Dialogues/FullscreenTable/FullscreenTable'
import VisualizationsDialogue from '../components/Dialogues/VisualizationsDialogue/VisualizationsDialogue'
// Context API
import { SpecProvider } from '../context/SpecContext'
import { UIProvider } from '../context/UIContext';
// Services
import OpenapiFormatter, { ODCTable } from '../services/OpenapiFormatter'
// types
import { RouteComponentProps } from '@reach/router'

interface Props extends RouteComponentProps {
  responseTables: any[]
  appConfig: any
  routes: any[]
  apiInfo: any
  paths: any
  swaggerData?: any
  updateResponseTables: (data: any) => void
}

const ApiItemsContainer: React.FC<Props> = ({
  responseTables,
  appConfig,
  routes,
  apiInfo,
  paths,
  swaggerData,
  updateResponseTables,
  ...props
}) => {
  const [showTableModal, setShowTableModal] = useState<boolean>(false)
  const [showVizModal, setShowVizModal] = useState<boolean>(false)
  const [modalTableIndex, setModalTableIndex] = useState<number>(-1)
  const [modalTableId, setModalTableId] = useState<string>("")

  const updateTableData = (data: any, tableId: string) => {
    // should have rows and columns...?
    // or should be an api response in the form array of objects or object
    let tableData = responseTables.find(table => table.id === tableId)
    if(tableData) {
      if(Array.isArray(data)) {
        // replace table.rows with the data, since already array
        updateResponseTables((prevTables: any) => {
          return prevTables.map((table: any) => {
            if(table.id === tableId) {
              table.rows = data;
              // console.log('data length:', data.length)
            }
            return table;
          })
        })
      }
      else {
        // populate only the first row with response object data
        updateResponseTables((prevTables: any) => {
          return prevTables.map((table: any) => {
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
        updateResponseTables(responseTables.map(responseTable => {
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
    setModalTableId(tableId)
    setModalTableIndex(foundTableIndex)
    setShowVizModal(true)
  }

  const onCloseTable = () => {
    setModalTableIndex(-1)
    setModalTableId("")
    setShowTableModal(false)
    setShowVizModal(false)
  }

  return (
    <SpecProvider>
      <UIProvider>
        <Layout
          routes={routes}
          logoUrl={apiInfo?.logoUrl}
        >
          <PageHeader
            loading={swaggerData ? false : true}
            title={swaggerData?.info.title || "loading"}
            description={swaggerData?.info.description || "loading"}
            version={swaggerData?.info.version || "loading"}
          />
          <ApiItems
            isFetching={swaggerData ? false : true}
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
          config={appConfig ? appConfig.items[modalTableId] : undefined}
          onCloseModal={onCloseTable}
        />
      </UIProvider>
    </SpecProvider>
  )
}

export default ApiItemsContainer
