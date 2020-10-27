import styled from 'styled-components'

const PageHeader = styled.header`
  padding: ${props => props.theme.headerPadding};
  padding-right: calc(${props => props.theme.rightColumnWidth} + ${props => props.theme.headerPadding});

  .header-title {

  }

  .header-description {

  }
`

export default PageHeader;
