import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

interface DeveloperModeProps extends RouteComponentProps {

}

const useStyles = makeStyles({
  pageContainer: {},
  card: {
    padding: 20
  }
})

const DeveloperMode: React.FC<DeveloperModeProps> = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.pageContainer}>
      <Paper elevation={1} className={classes.card}>
        <Typography variant="h3" component="h1">Developer Mode Activated</Typography>
      </Paper>
    </Container>
  )
}

export default DeveloperMode
