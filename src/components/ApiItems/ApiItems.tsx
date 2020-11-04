import React from 'react'
import { OpenAPIV3, OpenAPIV2 } from 'openapi-types'
import ApiItem from './ApiItem'
import ApiItemSkeleton from './ApiItemSkeleton'
// import apiItemsData from '../../mocks/api-items'

interface ApiItemsProps {
  apiData: any[]
  // apiData: OpenAPIV3.Document | OpenAPIV2.Document | undefined
  isFetching: boolean
}

const ApiItems: React.FC<ApiItemsProps> = ({
  apiData,
  isFetching,
}) => {

  const getTableColumns = (schema?: any) => {
    // will only get the first response for now
    // console.log('method:', method)
    // console.log('schema:', schema)
    if(!schema) return undefined

    let columns: any[] = []

    if(schema.items) {
      // an array of items
      for(let property in schema.items.properties) {
        let schemaItem = schema.items.properties[property]
        schemaItem.name = property;
        // console.log('property key:', property, 'property value:', schemaItem)
        columns.push(schemaItem)
      }
    }
    else {
      // a single item with 'properties'
      if(schema.properties) {
        // iterate over properties, adding each one to columns as an object
        for(let property in schema.properties) {
          let propertyItem = schema.properties[property]
          propertyItem.name = property;
          // console.log('property key:', property, 'property value:', propertyItem)
          columns.push(propertyItem)
        }
      }
      else {
        console.log('No properties were supplied for this schema. This is likely an error')
      }
    }
    console.log('columns returning from getTableColumns():', columns);

    return columns;
  }

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
      {apiData.map(apiItem => {
        return apiItem.methods.map((method: any) => (
          <ApiItem
            //@ts-ignore
            key={method.http}
            http={method.http}
            method={method.value} // rename to be more clear
            endpoint={apiItem.endpoint}
            columns={getTableColumns(method.value?.responses?.length && method.value?.responses[0]?.content["application/json"]?.schema)}
          />
        ))
      })}
    </div>
  )
}

export default ApiItems
