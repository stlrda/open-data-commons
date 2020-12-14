// import React from 'react'
// import { EditableText } from '@blueprintjs/core'

// export interface TextInputProps {
//   parameter: any
//   value: string
//   onChange: (data: string, parameterName: string) => void
//   validateInput?: (parameterName: string, parameterType: string, path?: boolean) => void
//   intent: "none" | "primary" | "success" | "warning" | "danger" | undefined
//   placeholder?: string
//   isPath?: boolean
//   alwaysRenderInput?: boolean
//   selectAllOnFocus?: boolean
// }

// const TextInput: React.FC<TextInputProps> = ({
//   parameter,
//   value,
//   onChange,
//   validateInput,
//   intent="none",
//   placeholder="",
//   isPath=false,
//   alwaysRenderInput=true,
//   selectAllOnFocus=true,
// }) => {

//   return (
//     <EditableText
//       alwaysRenderInput={alwaysRenderInput}
//       intent={intent}
//       placeholder={`${isPath ? "(PATH): " : ""}${placeholder}`}
//       selectAllOnFocus={selectAllOnFocus}
//       value={value}
//       onChange={(data) => onChange(data, parameter.name)}
//       onConfirm={() => validateInput && validateInput(parameter.name, parameter.schema.type, isPath)}
//     />
//   )
// }

// export default TextInput;
