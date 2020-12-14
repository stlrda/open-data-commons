import React from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'

interface LoadingProps {
  fluid?: boolean
  // from react-loadable
  error?: any
  retry?: any
  pastDelay?: any
}

const Loading: React.FC<LoadingProps> = ({
  fluid = false,
  error,
  pastDelay,
  retry,
  ...rest
}) => {

  if(error)
    return (
      <Container maxWidth={fluid ? false : "lg"}>
        <Paper elevation={1} style={{padding: 20}}>
          <Typography variant="h5" component="h1">Error Loading: {error}</Typography>
          <Button title="Retry" style={{textAlign:"center", margin:"2em auto"}} onClick={retry}>Retry</Button>
        </Paper>
      </Container>
    )
  else if(pastDelay)
    return (
      <Container maxWidth={fluid ? false : "lg"}>
        <Paper elevation={1} style={{padding: 20}}>
          <LinearProgress />
        </Paper>
      </Container>
    )
  else
    return null;
}

export default Loading;
