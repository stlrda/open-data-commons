import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import throttle from "lodash/throttle"
import pure from 'recompose/pure'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
// import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import { ODCNavRoute } from '../types/Openapi'

interface SidemenuProps {
  routeType: number
  routes: ODCNavRoute[]
  changeRouteType: (type: number) => void
}

const useStyles = makeStyles({
  sidemenu: {
    width: 240,
    position: 'fixed',
    top: 82,
    left: 90,
    bottom: 0,
    height: "100%",
    borderRadius: 0,
    padding: 10,
    transition: "width .1s ease",
    zIndex: 999
  },
  sidemenuHeader: {
    textAlign: 'center',
    paddingTop: 2
  },
  formControl: {
    minWidth: 90,
    // margin: 10,
    margin: "0 auto"
  },
  selectEmpty: {
    // marginTop: 10
  },
  routesList: {
    listStyle: "none",
    marginLeft: 0,
    paddingLeft: 0
  },
  routesItem: {
    // display: "inline-block"
  },
  routesLink: {
    textDecoration: "none !important",
    display: "block",
    color: "#272C36",
    marginBottom: 2,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: "1.2em",
    paddingLeft: 10,
    outline: "none"
  }
})

const Sidemenu: React.FC<SidemenuProps> = ({
  routeType,
  routes,
  changeRouteType
}) => {
  const classes = useStyles();
  let scrollListener: any
  // let mouseListener: any
  // let firefox_mouseListener: any

  // const [sidebarWidth, setSidebarWidth] = useState<number>(240) // for resize if implementing
  const [sidebarOffset, setSidebarOffset] = useState<number>(82)

  useEffect(() => {
    const scrollEventHandler = () => {
      let top = Math.floor(window.pageYOffset || document.documentElement.scrollTop)
      if(top > 0) {
        if(top >= 82) {
          if(sidebarOffset > 0)
            setSidebarOffset(prevOffset => 0)
        }
        else {
          if(sidebarOffset > 0)
            setSidebarOffset(prevOffset => 82 - top)
        }
      }
      else
        setSidebarOffset(82)

    }
    scrollListener = document.addEventListener('scroll', throttle(() => scrollEventHandler(), 30))
    // mouseListener = document.addEventListener("mousewheel", () => scrollEventHandler(), false);
    // Firefox
    // firefox_mouseListener = document.addEventListener("DOMMouseScroll", () => scrollEventHandler(), false);

    return () => {
      scrollListener && document.removeEventListener('scroll', scrollListener)
      // mouseListener && document.removeEventListener('mousewheel', mouseListener)
      // firefox_mouseListener && document.removeEventListener('DOMMouseScroll', firefox_mouseListener)
    }
  }, [])

  return (
    <Paper className={classes.sidemenu} elevation={1} style={{top: sidebarOffset}}>
      {/* Select Input Header */}
      <header className={classes.sidemenuHeader}>
        <FormControl className={classes.formControl}>
          <NativeSelect
            value={routeType}
            onChange={(event) => changeRouteType(event.target.value as unknown as number)}
            name="input-type"
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'input-type' }}
          >
            <option value={0}>Title</option>
            <option value={1}>Endpoint</option>
          </NativeSelect>
        </FormControl>
      </header>

      {/* Main Routes Content */}
      <ul className={classes.routesList}>
        {routes && routes.length && routes.map((route, index) => (
          <li className={classes.routesItem} key={`route-${index}`}>
            <Link className={classes.routesLink} href={`#${route.operationId}`}>
              {routeType == 0 ? route.summary : route.endpoint}
            </Link>
          </li>
        ))}
      </ul>
    </Paper>
  )
}

export default pure(Sidemenu);
