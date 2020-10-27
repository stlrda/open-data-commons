import React from 'react'
import StyledPageHeader from '../layout/header.styled'

interface PageHeaderProps {

}

const PageHeader: React.FC<PageHeaderProps> = () => {

  return (
    <StyledPageHeader>
      <h1 className="header-title">Open Data Commons</h1>
      <p className="header-description">
        A representation of API data in a CSV, tabular format.
        <br/>
        We hope this tool can help users of all kinds
      </p>
    </StyledPageHeader>
  )
}

export default PageHeader;
