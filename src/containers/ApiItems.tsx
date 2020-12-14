import React, { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import Container from '@material-ui/core/Container'
import ItemCard from './ItemCard'

interface Props extends RouteComponentProps {

}

interface ICardItem {
  name: string
  endpoint: string
  description?: string
}

const cardItems: ICardItem[] = [
  { name: "Crime Details", endpoint: "/crime/details", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae hendrerit sed mattis massa, porta facilisi lobortis libero. Quis a sit scelerisque tortor, eleifend neque, sed odio. Sed eget volutpat urna eget."},
  { name: "Crime Coords", endpoint: "/crime/coords" },
  { name: "Legacy District", endpoint: "/legacy/district", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
  { name: "Crime Geometry", endpoint: "/crime/{geometry}" }
]

const ApiItems: React.FC<Props> = () => {

  return (
    <Container>
      {cardItems.map(item => (
        <ItemCard
          key={item.name}
          {...item}
        />
      ))}
    </Container>
  )
}

export default ApiItems;

