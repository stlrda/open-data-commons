import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import DedupedeeTable from './Table'

interface Props{}


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface ICardItem {
  name: string
  endpoint: string
  description?: string
}
const rows: ICardItem[] = [
  { name: "Crime Details", endpoint: "/crime/details", description: "Lorem ipsum dolor sit amet"},
  // { name: "Crime Details", endpoint: "/crime/details", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae hendrerit sed mattis massa, porta facilisi lobortis libero. Quis a sit scelerisque tortor, eleifend neque, sed odio. Sed eget volutpat urna eget."},
  { name: "Crime Coords", endpoint: "/crime/coords" },
  { name: "Legacy District", endpoint: "/legacy/district", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
  { name: "Crime Geometry", endpoint: "/crime/{geometry}" }
]

const RoutesTable: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState<number[]>([])

  const handleOpenToggle = (index: number) => {
    if(open.includes(index))
      setOpen(open => open.filter(num => num != index))
    else {
      setOpen(open => [...open, index])
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Endpoint</TableCell>
            <TableCell>description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <>
              <TableRow>
                <TableCell>
                  <IconButton aria-label="expand row" size="small" onClick={() => handleOpenToggle(index)}>
                    {open.includes(index) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.endpoint}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={5}>
                  <Collapse in={open.includes(index)} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                        More Details about {row.name}
                      </Typography>
                      <div style={{height: 20}} />
                      <DedupedeeTable />
                      <div style={{height: 20}} />
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RoutesTable;
