import React from 'react';
import { ThemeProvider } from 'styled-components'
import Layout from './components/layout/Layout'
import PageHeader from './components/Header/PageHeader'
import ApiItems from './components/ApiItems/ApiItems'
import Parser from './components/ParseApi/Parser'
import GlobalStyle from './styles/global'
import odcTheme from './styles/theme'

const swaggerUrl = "https://api.stldata.org/crime/openapi.json"

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={odcTheme}>
        <Layout>
          <Parser swaggerUrl={swaggerUrl} />
          <PageHeader />

          <ApiItems />

        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
