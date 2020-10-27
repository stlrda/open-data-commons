// Theme file for styled-components

import {} from 'styled-components'

import odcTheme from './theme.interface'

declare module 'styled-components' {
  type Theme = typeof odcTheme;

  export interface DefaultTheme extends Theme {

  }
}

// If using 'css' prop of components:

/* import { CSSProp, CSSObject } from 'styled-components'

declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
} */
