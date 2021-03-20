// Import global css styles
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "leaflet/dist/leaflet.css"

import odcTheme from '../src/styles/theme'
import {ThemeProvider} from 'styled-components'

export const decorators = [
  Story => (
    <ThemeProvider theme={odcTheme}>
      <Story />
    </ThemeProvider>
  )
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
