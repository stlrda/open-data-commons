import React from 'react'
import ApiItem from './ApiItem'
import ApiItemSkeleton from './ApiItemSkeleton'
import apiItemsData from '../../mocks/api-items'

interface ApiItemsProps {
  swaggerData: any
  isFetching: boolean
}

const ApiItems: React.FC<ApiItemsProps> = ({
  swaggerData,
  isFetching,
}) => {

  if(isFetching) {
    return (
      <div className="content-container">
        <ApiItemSkeleton />
      </div>
    )
  }
  return (
    <div className="content-container">
      {apiItemsData.map(apiItem => (
        <ApiItem
          key={apiItem.id}
          apiItem={apiItem}
        />
      ))}
    </div>
  )
}

export default ApiItems
