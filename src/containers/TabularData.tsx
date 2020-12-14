import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

interface TabularDataProps extends RouteComponentProps {

}

const useStyles = makeStyles({
  pageContainer: {},
  card: {
    padding: 20
  }
})

const TabularData: React.FC<TabularDataProps> = (props) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.pageContainer}>
      <Paper elevation={1} className={classes.card}>
        <Typography>Tabular Data</Typography>
      </Paper>
    </Container>
  )
}

export default TabularData
