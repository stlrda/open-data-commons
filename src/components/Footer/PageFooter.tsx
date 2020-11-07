import React from 'react'
import Footer_Styled from './footer.styled'

interface FooterProps {}

const PageFooter: React.FC<FooterProps> = () => {

  return (
    <Footer_Styled>
      <p>Open Data Commons, 2020</p>
    </Footer_Styled>
  )
}

export default PageFooter;
