import React from 'react'
import Table from './new-components/Table'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'


interface Props {
  name: string
  details?: string
  endpoint: string
}

const useStyles = makeStyles({
  overviewCard: {
    // boxShadow: '0px 4px 12px rgba(39, 44, 54, 0.18)',
    // borderRadius: 2,
    paddingLeft: 45,
    paddingRight: 45,
    paddingTop: 21,
    paddingBottom: 21,
  },
  cardHeader: {
    marginBottom: 40,
  },
  cardSection: {
    marginBottom: 40,
  },
  cardHeaderTitle: {
    fontWeight: 400,
    opacity: 0.9,
  },
  cardHeaderDescription: {
    opacity: 0.95,
  },
  cardHeaderContextTitle: {
    fontWeight: 400,
    letterSpacing: 1,
    opacity: 0.8,
    fontSize: '1.15em',
  },
  cardSectionTitle: {
    marginBottom: 20
  },
})

const OverviewCard: React.FC<Props> = ({
  name,
  endpoint,
  details
}) => {
  const classes = useStyles()

  return (
    <Paper elevation={1} className={classes.overviewCard}>
      <header className={classes.cardHeader}>
        <Typography variant="body1" gutterBottom className={classes.cardHeaderContextTitle}>
          {endpoint}
        </Typography>
        <Typography variant="h3" gutterBottom className={classes.cardHeaderTitle}>
          {name}
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.cardHeaderDescription}>
          {details}
        </Typography>
      </header>

      <div className={`${classes.cardSection} card-query`}>
        <Typography variant="h4" gutterBottom className={classes.cardSectionTitle}>
          Query
        </Typography>
        {/* Query Table */}
        <Table />
      </div>

      <div className={`${classes.cardSection} card-response`}>
        <Typography variant="h4" gutterBottom className={classes.cardSectionTitle}>
          Response
        </Typography>
        {/* Response Table */}
        <Table />
      </div>
    </Paper>
  )
}

export default OverviewCard;
