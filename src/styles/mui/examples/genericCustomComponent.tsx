import React from 'react'
import Typography, { TypographyProps } from '@material-ui/core/Typography'

// See: https://material-ui.com/guides/typescript/
function GenericCustomComponent<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }>,
) {
  return <Typography>{props.children}</Typography>
}

function ThirdPartyComponent({ prop1 }: { prop1: string }) {
  return <div />
}

const Example = () => <GenericCustomComponent component={ThirdPartyComponent} prop1="Some Value" />

export {
  GenericCustomComponent,
  ThirdPartyComponent,
  Example
}
