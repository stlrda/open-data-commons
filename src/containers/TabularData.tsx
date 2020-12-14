import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Table from './new-components/Table'

interface TabularDataProps {

}

const useStyles = makeStyles({
  pageContainer: {},
  card: {
    padding: "20px 40px"
  },
  cardHeader: {
    marginBottom: 20
  },
  cardHeaderDescription: {
    opacity: 0.95
  }
})

const TabularData: React.FC<TabularDataProps> = (props) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.pageContainer}>
      <Paper elevation={1} className={classes.card}>
        <header className={classes.cardHeader}>
          <Typography variant="h3" component="h1" gutterBottom>Tabular Data</Typography>
          <Typography variant="body1" gutterBottom className={classes.cardHeaderDescription}>
            Descriptive Text
          </Typography>
        </header>
        <div className="content-inner">
          <Table />
        </div>
      </Paper>
    </Container>
  )
}

export default TabularData
