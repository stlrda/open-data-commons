import React from 'react'
// import { Button as BPButton } from '@blueprintjs/core/lib/cjs/components/button/buttons'
import { Button as BPButton } from '@blueprintjs/core'

interface ButtonProps {
  title: string
  handleClick: () => void
}

const Button: React.FC<ButtonProps> = ({
  title,
  handleClick
}) => {

  return (
    <BPButton
      text={title}
      onClick={handleClick}
    />
  )
}

export default Button;