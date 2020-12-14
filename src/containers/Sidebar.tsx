import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
// icon imports
import ListIcon from '@material-ui/icons/FormatListBulleted'
import BarChartIcon from '@material-ui/icons/BarChart';
import Layers from '@material-ui/icons/Layers'
import Code from '@material-ui/icons/Code'
import LightModeIcon from '@material-ui/icons/WbSunny'
import DarkModeIcon from '@material-ui/icons/Brightness4'
import MessageIcon from '@material-ui/icons/ChatBubbleOutline'

interface Props {
  activePanelIndex: number
  darkMode: boolean
  changeActivePanelIndex: (index: number) => void
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
  logoPlaceholder: {
    display: 'inline-block', width: 90, height: 82, background: "#6F52ED", cursor: 'pointer', textAlign:'center', fontSize: "1.35em", color: "#fff", fontWeight: "bold", fontFamily: "sans-serif", textTransform: "uppercase", lineHeight: "82px",
    transition: ".12s ease-in-out",
    "&:hover": {
    background: "#633fff",
    lineHeight: "78px",
    paddingLeft: 4,
    transition: ".15s ease-in-out",
    textShadow: `
      0 1px #808d93, -1px 0 #cdd2d5,
      -1px 2px #808d93,
      -2px 1px #cdd2d5,
      -2px 3px #808d93,
      -3px 2px #cdd2d5,
      -3px 4px #808d93,
      -4px 3px #cdd2d5,
      -4px 5px #808d93,
      -5px 4px #cdd2d5,
      -5px 6px #808d93,
      -6px 5px #cdd2d5,
      -6px 7px #808d93,
      -7px 6px #cdd2d5,
      -7px 8px #808d93,
      -8px 7px #cdd2d5
      `
    }
  },
  iconButtonAfter: {
    position: "relative",

    "&::after": {
      // borderRight: "1px solid #fff"
      content: "",
      position: "absolute",
      width: 1,
      color: "#fff",
      background: "#fff"
    }
  }
})

const Sidebar: React.FC<Props> = ({
  activePanelIndex,
  darkMode,
  changeActivePanelIndex,
  toggleDarkMode,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarTop}>
        <Link href="https://stldata.org" target="_blank" rel="noopener" style={{display:'block', outline: 'none'}}>
          <Typography component="span" className={classes.logoPlaceholder}>RDA</Typography>
        </Link>

        <nav className={classes.iconNavMenu}>
          {/* Icon Links */}
            <Tooltip enterDelay={0} title="Api Items" placement="right">
              <Link onClick={(e: any) => {
                e.preventDefault()
                changeActivePanelIndex(0)
              }} className={`${classes.navItem} ${classes.navLink}`} style={{marginTop: 8}}>
                <IconButton aria-label="api items" color="inherit" className={classes.iconButtonAfter}>
                  <ListIcon className={classes.navIcon} />
                </IconButton>
              </Link>
            </Tooltip>
          <Tooltip enterDelay={0} title="Visualizations" placement="right">
            <Link onClick={(e: any) => {
              e.preventDefault()
              changeActivePanelIndex(2)
            }} className={classes.navItem}>
              <IconButton aria-label="visualizations" color="inherit">
                <BarChartIcon className={classes.navIcon} />
              </IconButton>
            </Link>
          </Tooltip>
          <Link onClick={(e: any) => {
            e.preventDefault()
            changeActivePanelIndex(3)
          }}>
            <Tooltip enterDelay={0} title="Tabular Data" placement="right">
              <IconButton aria-label="view tabular data" color="inherit">
                <Layers className={classes.navIcon} />
              </IconButton>
            </Tooltip>
          </Link>
          <Link onClick={(e: any) => {
            e.preventDefault()
            changeActivePanelIndex(4)
          }}>
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
