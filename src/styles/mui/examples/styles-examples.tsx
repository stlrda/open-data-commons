import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles, useTheme } from '@material-ui/core/styles'

// Can use 'jss-plugin-template' if wanting to use CSS styles over JSS
const useStyles = makeStyles({
  root: {
    background: "green",
    border: 0
  },
  example: {
    //@ts-ignore
    color: props => props.color
  }
});

const exampleUseStyles: React.FC<any> = () => {
  const props = { backgroundColor: 'black', color: 'white' };
  const classes = useStyles(props);

  const currentTheme = useTheme();
  console.log('spacing of theme:', currentTheme.spacing)

  return (
    <Button className={classes.root}>Styles Hook</Button>
  )
}

export default exampleUseStyles;
