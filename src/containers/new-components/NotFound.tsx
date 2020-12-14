import React from 'react'
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

interface Props {

}

const NotFound: React.FC<Props> = (props) => {

  return (
    <Container>
      <Typography variant="h3" component="h1">Not Found</Typography>
      <Link href="#">Go Back</Link>
    </Container>
  )
}

export default NotFound
