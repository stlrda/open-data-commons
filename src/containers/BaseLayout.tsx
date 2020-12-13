import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

// import LaunchIcon from '@material-ui/icons/Launch'
// types
import { RouteComponentProps } from '@reach/router'

interface Props extends RouteComponentProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const useStyles = makeStyles({
  pageContainer: {},

})

const BaseLayout: React.FC<Props> = ({
  darkMode,
  toggleDarkMode,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <div className={classes.pageContainer}>
      {/* Left Sidebar */}
      <Sidebar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Top Bar */}
      <TopBar />

      {/* Main Content Panel */}
      <main className="main-content">

      </main>
    </div>
  )
}

export default BaseLayout
