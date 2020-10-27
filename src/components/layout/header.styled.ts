import styled from 'styled-components'

const PageHeader = styled.header`
  padding: ${props => props.theme.headerPadding};
  padding-right: calc(${props => props.theme.rightColumnWidth} + ${props => props.theme.headerPadding});

  .header-title {
    font-weight: 400;
    color: ${props => props.theme.dark};
    font-family: sans-serif;
    font-size: 2.3;
  }

  .header-description {

  }

  @media(max-width: ${props => props.theme.breakpoints.medium}) {
    padding-right: ${props => props.theme.headerPadding};
  }
`

export default PageHeader;
