import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import BarChart from '../components/visualizations/BarChart/BarChart'
import barChartData from '../components/visualizations/BarChart/barchart.data'

interface Props {

}

const useStyles = makeStyles({
  vizCard: {
    padding: 20
  },
  cardHeader: {
    marginBottom: 20
  },
  cardHeaderDescription: {
    opacity: 0.95,
  }
})

const Visualizations: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={1} className={classes.vizCard}>
        <header className={classes.cardHeader}>
          <Typography variant="h3" component="h1" gutterBottom>Visualizations</Typography>
          <Typography variant="body1" gutterBottom className={classes.cardHeaderDescription}>
            Descriptive Text
          </Typography>
        </header>
        <div className="viz-inner">
          <BarChart
            height={500}
            width={500}
            chartData={{
              value: barChartData,
              name: "Bar Chart"
            }}
          />
        </div>
      </Paper>
    </Container>
  )
}

export default Visualizations;
