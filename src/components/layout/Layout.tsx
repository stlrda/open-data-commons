import React from 'react'
import ThreeColumnLayout, { MainContent, SidebarLayout, Backdrop } from './layout.styled'
import Sidebar from '../Sidebar/Sidebar'
import { ODCNavRoute } from '../../types/Openapi'

interface LayoutProps {
  routes: ODCNavRoute[]
  logoUrl?: string
}

const Layout: React.FC<LayoutProps> = ({
  children,
  routes,
  logoUrl
}) => {
  // const [lightDarkTheme, setLightDarkTheme] = useState<0 | 1>(0); // 0 is light, 1 is dark

  // useEffect(() => {
  //   console.log('toggle the light / dark theme')
  // }, [lightDarkTheme])

  return (
    <ThreeColumnLayout>
      {/* Sidebar */}
      <SidebarLayout>
        <Sidebar routes={routes} logoUrl={logoUrl} />
      </SidebarLayout>

      {/* Main Content */}
        {/* If large or medium screen, 2 columns within the main content view */}
        {/* If small screen, 1 column with each row collapsed using flex-direction: column */}
      <MainContent>
        {/* Content Header, 100% width with 40% padding-right */}
        {children}
      </MainContent>

      {/* Right-column Backdrop, only display if large screens */}
      {/* <Backdrop /> */}
    </ThreeColumnLayout>
  )
}

export default Layout;
