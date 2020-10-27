import React, { useState } from 'react'
import { InputGroup, Tag } from '@blueprintjs/core'
import navItemsData from '../../mocks/nav-items'
import StyledSidebar, { SidebarHeader } from './sidebar.styled'

interface SidebarProps {

}

const Sidebar: React.FC<SidebarProps> = () => {
  const [activeTab, setActiveTab] = useState<number>(-1)
  const [searchInput, setSearchInput] = useState<string>("")

  const handleSearchChange = (event: any) => {
    setSearchInput(event.target.value)
  }

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    if(!searchInput) console.log('search must have text')
    console.log('submitting form with text:', searchInput)
    setSearchInput("")
  }

  const handleNavClick = (index: number) => { // React.MouseEvent<HTMLElement>?
    setActiveTab(index)
  }

  return (
    <StyledSidebar>
      {/* Logo Here */}
      <SidebarHeader>
        <h1>Open Data Commons</h1>
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
          {navItemsData.map((navItem, index) => (
            <li
              key={index}
              className={`sidebar-navitem ${index === activeTab && "active"}`}
              onClick={() => handleNavClick(index)}
            >
              <Tag
                htmlTitle={navItem.http}
                intent="success" // assumes all http are 'GET' for now
                minimal
                className="endpoint-http-text"
              >
                {navItem.http}
              </Tag>
              <span className="navitem-text">{navItem.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </StyledSidebar>
  )
}

export default Sidebar;
