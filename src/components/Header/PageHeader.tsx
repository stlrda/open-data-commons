import React, { useContext } from 'react'
import { Classes } from '@blueprintjs/core'
import StyledPageHeader from '../layout/header.styled'

import { SpecContext } from '../context/SpecContext'

interface PageHeaderProps {

}

const PageHeader: React.FC<PageHeaderProps> = () => {
  // reference context
  const { state, dispatch } = useContext(SpecContext)

  // TODO: replace with actual loading state

  const placeholderTitle = "this is a placeholder title text"
  const placeholderDescription = "this is a placehodler description text. congratulations if you are able to read this message. you must be awesome hacker"
  const placeholderVersion = "placeholder version"

  if(state.loading) {
    console.log('state should be loading:', state.loading)
    return (
      <StyledPageHeader>
        <h1 className={`header-title ${Classes.SKELETON}`}>{placeholderTitle}</h1>
        <h6 className={`header-version ${Classes.SKELETON}`}>{placeholderDescription}</h6>
        <p className={`header-description ${Classes.SKELETON}`}>{placeholderVersion}</p>
      </StyledPageHeader>
    )
  }
  else
    console.log('state changed:', state)
  return (
    <StyledPageHeader style={{marginRight:"15%"}}>
      {/* use state: state[0].data.info.title, state[0].data.info.description, state[0].data.info.version */}
      {/* @ts-ignore */}
      <h1 className="header-title">{state.data.info.title}</h1>
      {/* @ts-ignore */}
      <h4 className="header-version">{state.data.info.version}</h4>
      <p className="header-description">
        {/* @ts-ignore */}
        {state.data.info.description}
        {/* A representation of API data in a CSV, tabular format.

        <br/>
        We hope this tool can help users of all kinds */}
      </p>
    </StyledPageHeader>
  )
}

export default PageHeader;
