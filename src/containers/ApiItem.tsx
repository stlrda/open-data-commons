import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import OverviewCard from './OverviewCard'

interface Props extends RouteComponentProps {
  operationId?: string
}

interface IApiItemData {
  name: string
  details?: string
  endpoint: string
}

const ApiItem: React.FC<Props> = (props) => {
  // useContext to look this up
  const [apiItemData, setApiItemData] = useState<any>(null)

  useEffect(() => {
    if(props.operationId) {
      // show the user the operation Id
      console.log('operation id found:', props.operationId)
      setApiItemData({
        name: "Crime Details",
        endpoint: "/crime/details",
        details: "The crime details endpoint route is lit."
      })
    }
    else {
      console.log("operation id not found:", props.operationId)
    }
  }, [props.operationId])

  if(!apiItemData) {
    // return loading state
    return (
      <Container>
        <LinearProgress />
      </Container>
    )
  }
  return (
    <Container>

      <OverviewCard
        name={apiItemData.name}
        details={apiItemData.details}
        endpoint={apiItemData.endpoint}
      />

    </Container>
  )
}

export default ApiItem;
