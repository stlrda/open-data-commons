import React from 'react'
import { Link, RouteComponentProps } from '@reach/router'
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

interface Props extends RouteComponentProps {

}

const NotFound: React.FC<Props> = (props) => {

  return (
    <Container>
      <Typography variant="h3" component="h1">Not Found</Typography>
      <Link to="/">Go Back</Link>
    </Container>
  )
}

export default NotFound
