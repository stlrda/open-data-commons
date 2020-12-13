import React from 'react'
// import { OpenAPIV3, OpenAPIV2 } from 'openapi-types'
import { ODCTable } from '../../services/OpenapiFormatter'
import { DataCommonsConfig } from '../../mocks/config2'
import ApiItem from './ApiItem'
import ApiItemSkeleton from './ApiItemSkeleton'
// import apiItemsData from '../../mocks/api-items'

interface ApiItemsProps {
  apiData: any[]
  tables: ODCTable[]
  // apiData: OpenAPIV3.Document | OpenAPIV2.Document | undefined
  isFetching: boolean
  appConfig?: DataCommonsConfig.Config
  updateTableData(data: any, tableId: string): void
  resetTableRows(id: string): void
  showFullscreenTable(tableId: string): void
  showFullscreenViz(tableId: string): void
}

// Make HOC??
const ApiItems: React.FC<ApiItemsProps> = ({
  apiData,
  tables,
  isFetching,
  appConfig,
  updateTableData,
  resetTableRows,
  showFullscreenTable,
  showFullscreenViz
}) => {

  if(isFetching || apiData.length < 1) {
    return (
      <div className="content-container">
        <ApiItemSkeleton />
        {/* <ApiItemSkeleton /> */}
      </div>
    )
  }
  return (
    // Consider using <ul> here
    <div className="content-container">
      {apiData.map((apiItem, index) => {
          // console.log('api item:', apiItem)
          return (
            <ApiItem
              //@ts-ignore
              key={apiItem.methods[0].http}
              http={apiItem.methods[0].http}
              method={apiItem.methods[0].value} // rename to be more clear
              endpoint={apiItem.endpoint}
              table={tables[index]}
              updateTableData={updateTableData}
              resetTableRows={resetTableRows}
              showFullscreenTable={showFullscreenTable}
              showFullscreenViz={showFullscreenViz}
              config={appConfig ? appConfig.items[apiItem.methods[0].value.operationId as string] : undefined}
              formats={appConfig ? appConfig.formats : undefined}
            />
          )
        // ))
      })}
    </div>
  )
}

export default ApiItems
