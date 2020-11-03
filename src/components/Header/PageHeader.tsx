import React from 'react'
import { Classes } from '@blueprintjs/core'
import StyledPageHeader from '../layout/header.styled'

interface PageHeaderProps {
  loading: boolean
  title: string,
  description?: string,
  version?: string,
}

const PageHeader: React.FC<PageHeaderProps> = ({
  loading,
  title,
  description,
  version,
}) => {
  const placeholderTitle = "this is a placeholder title text"
  const placeholderDescription = "this is a placehodler description text. congratulations if you are able to read this message. you must be awesome hacker"
  const placeholderVersion = "placeholder version"

  if(loading) {
    return (
      <StyledPageHeader>
        <h1 className={`header-title ${Classes.SKELETON}`}>{placeholderTitle}</h1>
        <h6 className={`header-version ${Classes.SKELETON}`}>{placeholderDescription}</h6>
        <p className={`header-description ${Classes.SKELETON}`}>{placeholderVersion}</p>
      </StyledPageHeader>
    )
  }

  return (
    <StyledPageHeader style={{marginRight: "15%"}}>
      <h1 className="header-title">{title}</h1>
      {version && (
        <h4 className="header-description header-version">
          {version}
        </h4>
      )}
      {description && (
        <p className="header-description">
          {description}
        </p>
      )}
    </StyledPageHeader>
  )
}

export default PageHeader;
