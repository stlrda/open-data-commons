import React from 'react'
import ApiItem from './ApiItem'
import apiItemsData from '../../mocks/api-items'

interface ApiItemsProps {

}

const ApiItems: React.FC<ApiItemsProps> = () => {

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
