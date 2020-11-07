// Define the app theme
import { RDAColors } from './rda-colors'

interface odcTheme {
  /**
   * Colors
   */
  light: string; // some type of off-white
  dark: string; // some type of dark gray
  darkest: string;
  background: string;
  primary?: string;
  secondary?: string;
  tertiary?: string;
  gray?: string;
  red?: string;

  rdaColors: RDAColors

  /**
   * Typography
   */
  typography: {
    fontFamilyRegular: string;
    fontFamilyBold: string;

    fontSize: string,
    lineHeight: string
  }

  /**
   * Containers
   */
  containers: {
    borderRadius: string;
    // boxShadow1: {
    //   color: string;
    //   horizontalOffset: number;
    //   verticalOffset: number;
    // }
    // boxShadow2: {
    //   color: string;
    //   horizontalOffset: number;
    //   verticalOffset: number;
    // }
    // boxShadow3: {
    //   color: string;
    //   horizontalOffset: number;
    //   verticalOffset: number;
    // }
    padding: string; // string to account for px/rem unit
    margin: string; // string to account for px/rem unit
  }

  breakpoints: {
    custom?: string;
    large: string; // rems
    medium: string;
    small: string;
  }

  // One-offs
  sidebarWidth: string
  leftColumnRatio: string
  rightColumnRatio: string
  leftColumnWidth: string
  rightColumnWidth: string
  mainContentWidth: string
  headerPadding: string
  sectionPadding: string
  paragraphPadding: string
}

export default odcTheme
