import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import ItemCard from './ItemCard'

interface Props {
  paths: any[]
}

// interface ICardItem {
//   name: string
//   endpoint: string
//   description?: string
// }

// const cardItems: ICardItem[] = [
//   { name: "Crime Details", endpoint: "/crime/details", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae hendrerit sed mattis massa, porta facilisi lobortis libero. Quis a sit scelerisque tortor, eleifend neque, sed odio. Sed eget volutpat urna eget."},
//   { name: "Crime Coords", endpoint: "/crime/coords" },
//   { name: "Legacy District", endpoint: "/legacy/district", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
//   { name: "Crime Geometry", endpoint: "/crime/{geometry}" }
// ]

const ApiItems: React.FC<Props> = ({
  paths,
  ...rest
}) => {

  if(!paths || !paths.length) {
    // Can Add a timeout as well
    return (
      <Container>
        <LinearProgress />
      </Container>
    )
  }
  return (
    <Container>
      {paths.map((path, index) => (
        // name, endpoint, description
        <ItemCard
          key={`path-${index}`}
          name={path.methods[0].value.summary}
          endpoint={path.endpoint}
          description={path.methods[0].value.description}
          // {...path}
        />
      ))}
    </Container>
  )
}

export default ApiItems;

