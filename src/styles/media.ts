const customMediaQuery = (maxWidth: number, unit:string="rem") => `
  @media (max-width: ${maxWidth}${unit})
`

const media = {
  custom: customMediaQuery,
  large: customMediaQuery(100),
  medium: customMediaQuery(75),
  small: customMediaQuery(50),
}

export default media;

export {
  customMediaQuery
}
