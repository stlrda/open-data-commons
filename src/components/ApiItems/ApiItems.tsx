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

  if(isFetching || apiData.length < 1) {
    return (
      <div className="content-container">
        <ApiItemSkeleton />
        <ApiItemSkeleton />
      </div>
    )
  }
  return (
    <div className="content-container">
      {apiData.map(apiItem => {
        return apiItem.methods.map((method: any) => (
          <ApiItem
            key={method.http}
            http={method.http}
            method={method.value}
            endpoint={apiItem.endpoint}
          />
        ))
      })}
    </div>
  )
}

export default ApiItems
