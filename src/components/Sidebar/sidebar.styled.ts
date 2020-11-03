import styled from 'styled-components'

const StyledSidebar = styled.div`

  .sidebar-search-container {
    padding-left: 10px;
    padding-right: 10px;

    .search-input-group {
      background-color: transparent;
    }
  }

  .sidebar-items-container {

    .sidebar-items-list {
      margin-left: 0;
      padding-left: 0;
    }
    .sidebar-navitem {
      cursor: pointer;
      padding: 10px 20px;
      text-overflow: ellipsis;
      list-style: inside none none;

      &:hover {
        background: ${props => props.theme.gray};
      }
      &.active {
        background: ${props => props.theme.gray};
      }
    }
    .navitem-text {
      font-size: 1.1em;
    }
  }
  .endpoint-http-text {
    text-transform: uppercase;
    font-weight: 500;
    margin-right: 8px;
  }
`

const SidebarHeader = styled.div`
  padding: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    margin: 0;
    padding: 0;
  }

  .header-logo {
    height: 80;
    width: 80;
    align-self: center;
    vertical-align: center;
    text-align: center;
    margin: 0;
    padding: 0;
  }
`

export default StyledSidebar;

export {
  SidebarHeader,
}
