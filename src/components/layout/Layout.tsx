import React from 'react'
import ThreeColumnLayout, { MainContent, SidebarLayout, Backdrop } from './layout.styled'
import PageHeader from './header.styled'
import Sidebar from '../Sidebar/Sidebar'
import ApiItems from '../ApiItems/ApiItems'

interface LayoutProps {

}

const Layout: React.FC<LayoutProps> = () => {
  // const [lightDarkTheme, setLightDarkTheme] = useState<0 | 1>(0); // 0 is light, 1 is dark

  // useEffect(() => {
  //   console.log('toggle the light / dark theme')
  // }, [lightDarkTheme])

  return (
    <ThreeColumnLayout>
      {/* Sidebar */}
      <SidebarLayout>
        <Sidebar />
      </SidebarLayout>

      {/* Main Content */}
        {/* If large or medium screen, 2 columns within the main content view */}
        {/* If small screen, 1 column with each row collapsed using flex-direction: column */}
      <MainContent>
        {/* Content Header, 100% width with 40% padding-right */}
        <PageHeader>
          <h1 className="header-title">Open Data Commons</h1>
          <p className="header-description">A representation of API data in a CSV, tabular format. We hope this tool can help users of all kinds</p>
        </PageHeader>

        <ApiItems />
      </MainContent>

      {/* Right-column Backdrop, only display if large screens */}
      <Backdrop />
    </ThreeColumnLayout>
  )
}

export default Layout;
