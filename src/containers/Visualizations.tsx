import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
// types
import { RouteComponentProps } from '@reach/router'

interface Props extends RouteComponentProps {

}

const useStyles = makeStyles({
  vizCard: {
    padding: 20
  }
})

const Visualizations: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={1} className={classes.vizCard}>
        <Typography variant="h3" component="h1">Sick Viz bro</Typography>
      </Paper>
    </Container>
  )
}

export default Visualizations;
