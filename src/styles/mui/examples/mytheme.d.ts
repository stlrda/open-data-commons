import React from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width']
      breakpoint: Breakpoint
    }
  }

  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width'],
      breakpoint?: Breakpoint
    }
  }
}
