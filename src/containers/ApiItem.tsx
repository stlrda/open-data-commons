import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import OverviewCard from './OverviewCard'

interface Props {
  routeData?: any
}

const ApiItem: React.FC<Props> = ({
  routeData
}) => {
  // useContext to look up data from state

  if(!routeData) {
    // return loading state
    return (
      <Container>
        <Paper elevation={1} style={{padding: 20}}>
          <LinearProgress />
        </Paper>
      </Container>
    )
  }
  return (
    <Container>

      <OverviewCard
        name={routeData.methods[0].value.summary}
        details={routeData.methods[0].value.description}
        endpoint={routeData.endpoint}
      />

    </Container>
  )
}

export default ApiItem;
