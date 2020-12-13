import React, { useState } from 'react'
import Table from './new-components/Table'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Collapse from '@material-ui/core/Collapse'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'


interface Props {
  name: string
  endpoint: string
  description?: string
}

const useStyles = makeStyles({
  itemCard: {
    // boxShadow: '0px 4px 12px rgba(39, 44, 54, 0.18)',
    paddingLeft: 45,
    paddingRight: 45,
    paddingTop: 21,
    paddingBottom: 6,
    marginBottom: 20
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
  cardFooter: {
    textAlign: 'center',
  }
})

const ItemCard: React.FC<Props> = ({
  name,
  endpoint,
  description
}) => {
  const classes = useStyles()

  const [open, setOpen] = useState<boolean>(false)

  return (
    <Paper elevation={1} className={classes.itemCard}>
      <Typography variant="body1" gutterBottom className={classes.cardHeaderContextTitle}>
        {endpoint}
      </Typography>
      <Typography variant="h4" gutterBottom className={classes.cardHeaderTitle}>
        {name}
      </Typography>

      {description && (
        <Typography variant="body1" gutterBottom className={classes.cardHeaderDescription}>
          {description}
        </Typography>
      )}

      <Collapse in={open}>
        <div style={{padding: "4em"}}>
          <Typography variant="h5">is open now</Typography>
        </div>
      </Collapse>

      <div className={classes.cardFooter}>
        <Tooltip title="Expand">
          <IconButton onClick={() => setOpen(prevOpen => !prevOpen)}>
            {open ? <ArrowUpwardIcon style={{fontSize: 24}} /> : <ArrowDownwardIcon style={{fontSize: 24}} /> }
          </IconButton>
        </Tooltip>
      </div>

      {/* <div className={`${classes.cardSection} card-query`}>
        <Typography variant="h4" gutterBottom className={classes.cardSectionTitle}>
          Query
        </Typography>
        <Table />
      </div>

      <div className={`${classes.cardSection} card-response`}>
        <Typography variant="h4" gutterBottom className={classes.cardSectionTitle}>
          Response
        </Typography>
        <Table />
      </div> */}
    </Paper>
  )
}

export default ItemCard;
