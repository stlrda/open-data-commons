import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

interface DeveloperModeProps {

}

const useStyles = makeStyles({
  pageContainer: {},
  card: {
    padding: 20
  },
  cardHeader: {
    marginBottom: 20
  },
  cardHeaderDescription: {
    opacity: 0.95
  }
})

const DeveloperMode: React.FC<DeveloperModeProps> = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.pageContainer}>
      <Paper elevation={1} className={classes.card}>
        <header className={classes.cardHeader}>
          <Typography variant="h3" component="h1" gutterBottom>Developer Mode Activated</Typography>
          <Typography variant="body1" gutterBottom className={classes.cardHeaderDescription}>
            Descriptive Text
          </Typography>
        </header>
        <div className="content-inner">
          <Button title="Enter Dev Mode">Enter Dev Mode</Button>
        </div>
      </Paper>
    </Container>
  )
}

export default DeveloperMode
