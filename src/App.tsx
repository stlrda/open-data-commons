import React from 'react';
import { ThemeProvider } from 'styled-components'
import Layout from './components/layout/Layout'
import PageHeader from './components/layout/header.styled'
import ApiItems from './components/ApiItems/ApiItems'
import GlobalStyle from './styles/global'
import odcTheme from './styles/theme'

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={odcTheme}>
        <Layout>
          <PageHeader>
            <h1 className="header-title">Open Data Commons</h1>
            <p className="header-description">A representation of API data in a CSV, tabular format. We hope this tool can help users of all kinds</p>
          </PageHeader>

          <ApiItems />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
