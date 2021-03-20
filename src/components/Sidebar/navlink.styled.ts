import styled from 'styled-components'

const NavLink_Styled = styled.li`
  &.sidebar-navitem {
    list-style: inside none none;
    background: transparent;

    &:hover {
      background: ${props => props.theme.gray};
    }
    &.active {
      background: ${props => props.theme.gray};
    }

    a.sidebar-navlink {
      cursor: pointer;
      display: block;
      padding: 10px 20px;
      text-overflow: ellipsis;
      text-decoration: none;
      color: initial;
      border: 0; outline: 0;

      .navitem-text {
        font-size: 1.1em;
      }
    }
  }
`

export default NavLink_Styled
