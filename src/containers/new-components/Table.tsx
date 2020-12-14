import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

interface Props {

}

const rows = [
  {
    name: "name",
    lat: 239023,
    lon: 38903832,
    date: "2020-20-20"
  },
  {
    name: "name",
    lat: 239023,
    lon: 38903832,
    date: "2020-20-20"
  },
  {
    name: "name",
    lat: 239023,
    lon: 38903832,
    date: "2020-20-20"
  },
  {
    name: "name",
    lat: 239023,
    lon: 38903832,
    date: "2020-20-20"
  },
  {
    name: "name",
    lat: 239023,
    lon: 38903832,
    date: "2020-20-20"
  },
  {
    name: "name",
    lat: 239023,
    lon: 38903832,
    date: "2020-20-20"
  },
]

const useStyles = makeStyles({
  queryTable: {
    minWidth: 650
  }
})

const SimpleTable: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <TableContainer component={(props: any) => <Paper elevation={3} {...props} />}>
      <Table className={classes.queryTable} aria-label="query table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Lat</TableCell>
            <TableCell align="right">Lon</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.lat}</TableCell>
              <TableCell align="right">{row.lon}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SimpleTable
