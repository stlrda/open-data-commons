import styled from 'styled-components'

const Footer_Styled = styled.footer`
  margin-right: calc(40% - 130px + 9.4em);
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;

  p {
    margin-bottom: 0;
  }

  @media(max-width: 75rem) {
    margin-right: 0;
  }
`

export default Footer_Styled;
