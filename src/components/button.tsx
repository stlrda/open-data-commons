import React from 'react'

interface ButtonProps {
  title: string
  handleClick: () => void
}

const Button: React.FC<ButtonProps> = ({
  title,
  handleClick
}) => {

  return (
    <button onClick={handleClick}>
      {title}
    </button>
  )
}

export default Button;