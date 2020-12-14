import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'

export default function createMyTheme(options: ThemeOptions) {
  return createMuiTheme ({
    appDrawer: {
      width: 225,
      breakpoint: 'lg'
    },
    ...options
  })
}

// How to use:
// import createMyTheme from './styles/createMyTheme'
// const theme = createMyTheme({ appDrawer: { breakpoint: 'md' }})
