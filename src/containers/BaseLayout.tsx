import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import FAB from '@material-ui/core/Fab'
import SpeedDial, { SpeedDialProps } from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import WidgetsIcon from '@material-ui/icons/Widgets'
import LaunchIcon from '@material-ui/icons/Launch'
import SaveIcon from '@material-ui/icons/Save'
// types
import { RouteComponentProps } from '@reach/router'

interface Props extends RouteComponentProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const useStyles = makeStyles({
  pageContainer: {
  },
  mainContent: {
    position: 'relative',
    minHeight: 'calc(100vh - 82px)',
    background: 'rgba(178, 185, 200, 0.15)',
    marginLeft: 90,
  },
  fab: {
    background: '#6F52ED',
    position: 'absolute',
    width: 75,
    height: 75,
    bottom: 45,
    right: 45,
  },
  speedDial: {
    position: 'absolute',
    bottom: 45,
    right: 45,
  }
})

const actions = [
  { icon: <LaunchIcon />, name: "Launch" },
  { icon: <SaveIcon />, name: "Save" }
]

const BaseLayout: React.FC<Props> = ({ darkMode, toggleDarkMode, ...rest }) => {
  const classes = useStyles()

  const handleFabClick = () => console.log('fab clicked')

  return (
    <div className={classes.pageContainer}>
      {/* Left Sidebar */}
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Top Bar */}
      <TopBar />

      {/* Main Content Panel */}
      <main className={classes.mainContent}>
        {/* FAB */}
        {/* <Fab aria-label="try out api" color="inherit" className={classes.fab} size="large">
          <WidgetsIcon style={{ fontSize: 42, color: '#fff' }} />
        </Fab> */}
        <SpeedDial
          ariaLabel="Menu Actions"
          className={classes.speedDial}
          hidden={false}
          open={true}
          icon={<WidgetsIcon />}
          direction={'up'}
        >
          {actions.map(action => {
            return <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleFabClick}
            />
          })}
        </SpeedDial>
      </main>
    </div>
  )
}

export default BaseLayout
