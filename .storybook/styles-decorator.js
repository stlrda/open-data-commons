import React from 'react'
import { ThemeProvider } from 'styled-components'
import odcTheme from './src/styles/theme'

const StylesDecorator = storyFn => (
  <ThemeProvider theme={odcTheme}>
    {storyFn()}
  </ThemeProvider>
)

export default StylesDecorator
