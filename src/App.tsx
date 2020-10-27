import React from 'react';
import Layout from './components/layout/Layout'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/global'
import odcTheme from './styles/theme'

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={odcTheme}>
        <Layout />
      </ThemeProvider>
    </>
  );
}

export default App;
