import React, { useState } from 'react'
import { InputGroup } from '@blueprintjs/core'
import NavLink from './NavLink'
import StyledSidebar, { SidebarHeader } from './sidebar.styled'
import { ODCNavRoute } from '../../types/Openapi'

export interface SidebarProps {
  routes: ODCNavRoute[]
  logoUrl?: string
}

const Sidebar: React.FC<SidebarProps> = ({
  routes,
  logoUrl
}) => {

  const [activeTab, setActiveTab] = useState<number>(-1)
  const [searchInput, setSearchInput] = useState<string>("")

  const handleSearchChange = (event: any) => {
    setSearchInput(event.target.value)
  }

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    if(!searchInput) console.log('search must have text')
    // console.log('submitting form with text:', searchInput)
    setSearchInput("")
  }

  const handleNavClick = (index: number, operationId: string) => {
    setActiveTab(index)
    // console.log('route with id clicked:', operationId)
  }

  return (
    <StyledSidebar>
      {/* Logo Here */}
      <SidebarHeader>
        {/* The Logo */}
        {logoUrl ? (
          <a href="https://stldata.org" target="_blank" rel="noreferrer">
            <img
              src={logoUrl}
              width={230}
              height={230}
              className="header-logo"
              style={{cursor:'pointer'}}
              alt="Open Data Commons - Logo"
            />
          </a>
        ) : (
          <h1>Open Data Commons</h1>
        )}
      </SidebarHeader>

      {/* Search Components */}
      <div className="sidebar-search-container">
        <form onSubmit={handleSearchSubmit}>
          <InputGroup
            leftIcon="search"
            placeholder="Search..."
            className="search-input-group"
            type="search"
            value={searchInput}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />
        </form>
      </div>

      {/* Navigation Items */}
      <div className="sidebar-items-container">
        <ul className="sidebar-items-list">
          {routes.map((route, index) => (
            <NavLink
              key={index}
              index={index}
              active={index === activeTab}
              operationId={route.operationId}
              http={route.http}
              summary={route.summary}
              handleNavClick={handleNavClick}
            />
          ))}
          {routes.length < 1 && (
            <li className="sidebar-navitem" style={{margin: 10, padding: 5, listStyle: "none"}}>
              <span className="endpoint-http-text bp3-skeleton" style={{width: 20}}>Load</span>
              <span className="navitem-text bp3-skeleton">Loading Api Routes</span>
            </li>
          )}
        </ul>
      </div>
    </StyledSidebar>
  )
}

export default Sidebar;
