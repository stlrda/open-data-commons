import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import OverviewCard from './OverviewCard'
import ItemCard from './ItemCard'
import Sidemenu from './Sidemenu'
import RoutesTable from './new-components/RoutesTable'
// import FAB from '@material-ui/core/Fab'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'

// import Tooltip from '@material-ui/core/Tooltip'
import SpeedDial, { SpeedDialProps } from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import WidgetsIcon from '@material-ui/icons/Widgets'
import LaunchIcon from '@material-ui/icons/Launch'
import SaveIcon from '@material-ui/icons/Save'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
// types
import { RouteComponentProps } from '@reach/router'

interface Props extends RouteComponentProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const useStyles = makeStyles({
  pageContainer: {
    background: "#fff"
  },
  mainContent: {
    position: 'relative',
    minHeight: 'calc(100vh - 82px)',
    background: 'rgba(178, 185, 200, 0.15)',
    marginLeft: 90,
    transition: ".1s ease"
  },
  innerContent: {
    paddingTop: 26,
    paddingBottom: 26,
    paddingLeft: 15,
    paddingRight: 15,
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
    position: 'fixed',
    bottom: 45,
    right: 45,
  },
  sidemenuIconButton: {
    position: 'fixed',
    top: 92,
    left: 100,
    zIndex: 1000,
    border: "1px solid rgba(0,0,0,.25)",
    background: "#fff !important",
    padding: 5
  },
})

const actions = [
  { icon: <LaunchIcon />, name: 'Launch' },
  { icon: <SaveIcon />, name: 'Save' },
]

const BaseLayout: React.FC<Props> = ({ darkMode, toggleDarkMode, ...rest }) => {
  const classes = useStyles()

  const [showSideMenu, setShowSideMenu] = useState<boolean>(false)
  const [routeType, setRouteType] = useState<number>(0); // 0 or 1

  const handleFabClick = () => console.log('fab clicked')

  const toggleSideMenu = () => setShowSideMenu(prevShow => !prevShow)

  const handleRouteTypeChange = (type: number) => setRouteType(type)

  return (
    <div className={classes.pageContainer}>
      {/* Left Sidebar */}
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Top Bar */}
      <TopBar />

      {/* Arrow Button to Trigger Side Menu */}
      <IconButton className={classes.sidemenuIconButton} onClick={toggleSideMenu}
        style={{left: showSideMenu ? ((90 - 16) + 240) : 100 }}
      >
        {showSideMenu
          ? <ArrowBackIcon style={{fontSize: 24, color: "#272C36"}} />
          : <ArrowForwardIcon style={{fontSize: 24, color: "#272C36"}} />
        }
      </IconButton>

      {showSideMenu && (
        <Sidemenu
          routeType={routeType}
          changeRouteType={handleRouteTypeChange}
        />
      )}

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
        FabProps={{style: {background: '#6F52ED'}}}
        direction={'up'}
      >
        {actions.map((action) => {
          return (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleFabClick}
            />
          )
        })}
      </SpeedDial>

      {/* Main Content Panel */}
      <main className={classes.mainContent} style={{marginLeft: showSideMenu ? (90 + 240) : 90 }}>
        <div className={classes.innerContent}>

          {rest.children}

        </div>
      </main>
    </div>
  )
}

export default BaseLayout
