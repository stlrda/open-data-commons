import React from 'react'
import { OpenAPIV3, OpenAPIV2 } from 'openapi-types'
import { ODCTable } from '../../services/OpenapiFormatter'
import ApiItem from './ApiItem'
import ApiItemSkeleton from './ApiItemSkeleton'
// import apiItemsData from '../../mocks/api-items'

interface ApiItemsProps {
  apiData: any[]
  tables: ODCTable[]
  // apiData: OpenAPIV3.Document | OpenAPIV2.Document | undefined
  isFetching: boolean
  resetTableRows(id: string): void
}

const ApiItems: React.FC<ApiItemsProps> = ({
  apiData,
  tables,
  isFetching,
  resetTableRows
}) => {

  if(isFetching || apiData.length < 1) {
    return (
      <div className="content-container">
        <ApiItemSkeleton />
        <ApiItemSkeleton />
      </div>
    )
  }
  return (
    // Consider using <ul> here
    <div className="content-container">
      {apiData.map((apiItem, index) => {
        // return apiItem.methods.map((method: any) => (
          return (
            <ApiItem
              //@ts-ignore
              key={apiItem.methods[0].http}
              http={apiItem.methods[0].http}
              method={apiItem.methods[0].value} // rename to be more clear
              endpoint={apiItem.endpoint}
              table={tables[index]}
              resetTableRows={resetTableRows}
            />
          )
        // ))
      })}
    </div>
  )
}

export default ApiItems
