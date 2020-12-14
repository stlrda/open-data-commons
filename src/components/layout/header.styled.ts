import styled from 'styled-components'

const PageHeader = styled.header`
  padding: 2em;
  padding-right: calc(40% - 130px + 2em);

  .header-title {
    font-weight: 400;
    color: #263238;
    font-family: sans-serif;
    font-size: 2.3em;
    margin-left: 0;
  }

  .header-version {
    font-size: 1.2em;
    font-weight: bold;
  }

  .header-description {
    font-size: 1.15em;
    margin-bottom: 0;
  }

  @media(max-width: 75rem) {
    padding-right: 2em;
  }
`

export default PageHeader;
