import styled from 'styled-components'

const ThreeColumnLayout = styled.div`
  position: relative;
`

const SidebarLayout = styled.div`
  position: fixed;
  left: 0;
  height: 100vh;
  width: 260px;
  background: #FAFAFA;

  @media(max-width: 50rem) {
    display: none;
  }
`

const MainContent = styled.main`
  background: #fff;
  padding-left: 260px;
  width: 100%;

  .content-container {
    // padding-left: 40px; // TODO: add to global theme
    // padding-right: 40px;
  }

  @media(max-width: 75rem) {
    // width: props.theme.mainContentWidth};

    .content-container {
      padding-left: 0;
      padding-right: 0;
    }
  }
  @media(max-width: 50rem) {
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
  // width: props.theme.rightColumnWidth};
  width: calc(40% - 130px + 2em);
  background: #263238;
  z-index: 0;

  @media(max-width: 75rem) {
    display: none;
  }
`

export default ThreeColumnLayout

export {
  SidebarLayout,
  Backdrop,
  MainContent,
}
