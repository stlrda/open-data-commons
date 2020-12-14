import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

// https://material-ui.com/customization/default-theme/
const theme = createMuiTheme({
  palette: {
    type: "light"
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h6: 'h2',
      }
    }
  }
})

const darkMuiTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
})

export const lightTheme = responsiveFontSizes(theme);
export const darkTheme = responsiveFontSizes(darkMuiTheme);
