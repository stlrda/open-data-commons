import styled from 'styled-components'

const ThreeColumnLayout = styled.div`
  position: relative;
`

const SidebarLayout = styled.div`
  position: fixed;
  left: 0;
  height: 100vh;
  width: ${props => props.theme.sidebarWidth};
  background: ${props => props.theme.light};

  @media(max-width: ${props => props.theme.breakpoints.small}) {
    display: none;
  }
`

const MainContent = styled.main`
  background: ${props => props.theme.background};
  padding-left: ${props => props.theme.sidebarWidth};
  width: 100%;

  .content-container {
    // padding-left: 40px; // TODO: add to global theme
    // padding-right: 40px;
  }

  @media(max-width: ${props => props.theme.breakpoints.medium}) {
    // width: ${props => props.theme.mainContentWidth};

    .content-container {
      padding-left: 0;
      padding-right: 0;
    }
  }
  @media(max-width: ${props => props.theme.breakpoints.small}) {
    margin-left: 0;
    padding-left: 0;
    width: 100%;
  }
`

const Backdrop = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  // width: ${props => props.theme.rightColumnWidth};
  width: calc(40% - 130px + 2em);
  background: ${props => props.theme.dark};
  z-index: 0;

  @media(max-width: ${props => props.theme.breakpoints.medium}) {
    display: none;
  }
`

export default ThreeColumnLayout

export {
  SidebarLayout,
  Backdrop,
  MainContent,
}
