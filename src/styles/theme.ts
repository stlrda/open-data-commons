import ODCTheme from './theme.interface'
import rdaColors from './rda-colors'

const odcTheme: ODCTheme = {
  // Colors
  dark: "#263238",
  darkest: "#11171A",
  light: "#FAFAFA",
  background: "#fff",
  gray: "#E1E1E1",
  red: "rgb(234, 24, 18)",

  rdaColors: rdaColors,

  // Typography
  typography: {
    fontFamilyRegular: "sans-serif",
    fontFamilyBold: "serif",
    fontSize: "14px",
    lineHeight: "1.5em",
  },

  containers: {
    borderRadius: "20px",
    padding: "1em",
    margin: "1em",
  },

  breakpoints: {
    large: "105rem",
    medium: "75rem",
    small: "50rem",
  },

  sidebarWidth: "260px",
  leftColumnRatio: "60%",
  rightColumnRatio: "40%",
  leftColumnWidth: "calc(60% - 130px)", // the width minus the half the sidebar width
  rightColumnWidth: "calc(40% - 130px)",
  mainContentWidth: "calc(100% - 260px)",
  headerPadding: "2em",
  sectionPadding: "1em",
  paragraphPadding: ".75em",
}

export default odcTheme;
