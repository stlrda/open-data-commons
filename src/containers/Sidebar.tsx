import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@reach/router'
import MUILink from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
// icon imports
import ListIcon from '@material-ui/icons/FormatListBulleted'
import BarChartIcon from '@material-ui/icons/BarChart';
import Layers from '@material-ui/icons/Layers'
import Code from '@material-ui/icons/Code'
import LightModeIcon from '@material-ui/icons/WbSunny'
import DarkModeIcon from '@material-ui/icons/Brightness4'
import MessageIcon from '@material-ui/icons/ChatBubbleOutline'

interface Props {
  darkMode: boolean
  toggleDarkMode: () => void
}


const useStyles = makeStyles({
  sidebar: {
    // border: "1px solid #fff",
    position: 'fixed',
    background: "#272C36",
    top: 0,
    bottom: 0,
    left: 0,
    width: 90,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  sidebarTop: {
    flex: 1
  },
  iconNavMenu: {
    // border: "1px solid #fff",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  navItem: {
    marginBottom: 8,
  },
  navIcon: {
    color: "#fff",
    fontSize: 44,
  },
  navLink: { outline: 'none', borderRadius: "50%" },
  logoPlaceholder: {display: 'inline-block', width: 66, height: 53, marginLeft: 12, marginRight: 12, marginTop: 15, marginBottom: 15, background: "#6F52ED", cursor: 'pointer' }
})

const Sidebar: React.FC<Props> = ({
  darkMode,
  toggleDarkMode,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarTop}>
        <MUILink href="https://stldata.org" target="_blank" rel="noopener" style={{display:'block', outline: 'none'}}>
          <span className={classes.logoPlaceholder}></span>
        </MUILink>

        <nav className={classes.iconNavMenu}>
          {/* Icon Links */}
            <Tooltip enterDelay={0} title="Api Items" placement="right">
              <Link to="/" className={`${classes.navItem} ${classes.navLink}`}>
                <IconButton aria-label="api items" color="inherit">
                  <ListIcon className={classes.navIcon} />
                </IconButton>
              </Link>
            </Tooltip>
          <Tooltip enterDelay={0} title="Visualizations" placement="right">
            <Link to="/visualize" className={classes.navItem}>
              <IconButton aria-label="visualizations" color="inherit">
                <BarChartIcon className={classes.navIcon} />
              </IconButton>
            </Link>
          </Tooltip>
          <Link to="/tabular-data">
            <Tooltip enterDelay={0} title="Tabular Data" placement="right">
              <IconButton aria-label="view tabular data" color="inherit">
                <Layers className={classes.navIcon} />
              </IconButton>
            </Tooltip>
          </Link>
          <Link to="/code-examples">
            <Tooltip enterDelay={0} title="See Code Examples" placement="right">
              <IconButton aria-label="see code examples" color="inherit">
                <Code className={classes.navIcon} />
              </IconButton>
            </Tooltip>
          </Link>
        </nav>
      </div>

      <nav className={classes.iconNavMenu} style={{marginBottom: 24}}>
        <Tooltip enterDelay={0} title="Send Feedback" placement="right">
          <IconButton aria-label="send feedback" color="inherit">
            <MessageIcon className={classes.navIcon} />
          </IconButton>
        </Tooltip>
        {/* Use darkMode prop */}
        {darkMode ? (
          <Tooltip enterDelay={0} title="Toggle Light / Dark Mode" placement="right">
            <IconButton aria-label="list" color="inherit" onClick={() => toggleDarkMode()}>
              <LightModeIcon className={classes.navIcon} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Toggle Light / Dark Mode" placement="right">
            <IconButton aria-label="list" color="inherit" onClick={() => toggleDarkMode()}>
              <DarkModeIcon className={classes.navIcon} />
            </IconButton>
          </Tooltip>
        )}
      </nav>
    </div>
  )
}

export default Sidebar;
