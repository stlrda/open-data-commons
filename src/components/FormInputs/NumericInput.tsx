// import React from 'react'
// import { NumericInput as BPNumericInput } from "@blueprintjs/core"
// // import { action } from '@storybook/addon-actions'

// export interface NumericInputProps {
//   value: number
//   parameterName: string
//   onValueChange: (numericValue: number, parameterName: string) => void
//   isPath?: boolean
//   style?: any
//   min?: number
//   max?: number
//   placeholder?: string
// }

// const NumericInput: React.FC<NumericInputProps> = ({
//   value,
//   parameterName,
//   onValueChange,
//   isPath=false,
//   style={margin: 0},
//   min,
//   max,
//   placeholder,
// }) => {

//   return (
//     <BPNumericInput
//       style={style}
//       intent="none"
//       min={min}
//       max={max}
//       placeholder={placeholder}
//       value={value}
//       onValueChange={(number: number) => onValueChange(number, parameterName)}
//       // leftIcon={(queryData.description || formatData.description) ? (
//       //   // <Tooltip content={queryData.description || formatData.description} position={Position.TOP}>
//       //     <Icon icon="info-sign" />
//       //   // {/* </Tooltip> */}
//       // ) : undefined}
//     />
//   )
// }

// export default NumericInput
