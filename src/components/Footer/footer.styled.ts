import styled from 'styled-components'

const Footer_Styled = styled.footer`
  margin-right: calc(${props => props.theme.rightColumnWidth} + 9.4em);
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;

  p {
    margin-bottom: 0;
  }

  @media(max-width: ${props => props.theme.breakpoints.medium}) {
    margin-right: 0;
  }
`

export default Footer_Styled;
