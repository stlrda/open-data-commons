import React from 'react'
import { Tag } from '@blueprintjs/core'
import NavLink_Styled from './navlink.styled'

interface NavLinkProps {
  active?: boolean
  index: number
  operationId: string
  http: string
  summary: string
  handleNavClick: (index: number, operationId: string) => void
}

const NavLink: React.FC<NavLinkProps> = ({
  active,
  index,
  operationId,
  http,
  summary,
  handleNavClick
}) => {

  return (
    <NavLink_Styled className={`sidebar-navitem noselect ${active && "active"}`}>
      <a
        className="sidebar-navlink"
        href={`#${operationId}`}
        onClick={() => handleNavClick(index, operationId)}
      >
        <Tag
          htmlTitle={http}
          intent="success" // assumes all http are 'GET' for now
          minimal
          className="endpoint-http-text"
        >
          {http}
        </Tag>
        <span className="navitem-text">{summary}</span>
      </a>
    </NavLink_Styled>
  )
}

export default NavLink;
