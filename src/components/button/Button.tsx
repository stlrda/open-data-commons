import React from 'react'
// import { Button as BPButton } from '@blueprintjs/core/lib/cjs/components/button/buttons'
import MuiButton from '@material-ui/core/Button'

interface ButtonProps {
  title: string
  handleClick: () => void
}

const Button: React.FC<ButtonProps> = ({
  title,
  handleClick
}) => {

  return (
    <MuiButton
      title={title}
      onClick={handleClick}
    >
      {title}
    </MuiButton>
  )
}

export default Button;
