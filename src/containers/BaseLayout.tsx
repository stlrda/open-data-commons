import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import OverviewCard from './OverviewCard'
import ItemCard from './ItemCard'
import RoutesTable from './new-components/RoutesTable'
// import FAB from '@material-ui/core/Fab'
import Container from '@material-ui/core/Container'
// import Tooltip from '@material-ui/core/Tooltip'
import SpeedDial, { SpeedDialProps } from '@material-ui/lab/SpeedDial'
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
  pageContainer: {},
  mainContent: {
    position: 'relative',
    minHeight: 'calc(100vh - 82px)',
    background: 'rgba(178, 185, 200, 0.15)',
    marginLeft: 90,
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
})

const actions = [
  { icon: <LaunchIcon />, name: 'Launch' },
  { icon: <SaveIcon />, name: 'Save' },
]

interface ICardItem {
  name: string
  endpoint: string
  description?: string
}
const cardItems: ICardItem[] = [
  { name: "Crime Details", endpoint: "/crime/details", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae hendrerit sed mattis massa, porta facilisi lobortis libero. Quis a sit scelerisque tortor, eleifend neque, sed odio. Sed eget volutpat urna eget."},
  { name: "Crime Coords", endpoint: "/crime/coords" },
  { name: "Legacy District", endpoint: "/legacy/district", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
  { name: "Crime Geometry", endpoint: "/crime/{geometry}" }
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
      <main className={classes.mainContent}>
        {/* Main Content Card */}
        <div className={classes.innerContent}>
          <Container>

            {/* <OverviewCard /> */}

            {cardItems.map(item => (
              <ItemCard
                key={item.name}
                {...item}
              />
            ))}

            {/* <RoutesTable /> */}

          </Container>
        </div>
      </main>
    </div>
  )
}

export default BaseLayout
