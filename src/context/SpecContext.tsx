import React, { useReducer, createContext } from 'react'
import { appReducer, AppActions } from './AppReducer'

type DataType = {
  data: any, // JSON
  // loading: boolean
}
interface IDataType {
  data: any
}

// export type InitialStateType = {
//   data: DataType[], // OpenApi Type
//   loading: boolean // boolean
// }
export type InitialStateType = {
  data: any //IDataType[] // IDataType[]
  loading: boolean
}

// export type InitialStateType =

const initialState = {
  data: [],
  loading: true,
}

const SpecContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<AppActions>
}>({
  state: initialState,
  dispatch: () => null,
})

// const mainReducer = (state: InitialStateType, action: AppActions) => ({
//   appState: AppReducer(state, action),
//   // loading: AppReducer(loading, action)
// })

const SpecProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <SpecContext.Provider value={{ state, dispatch }}>{children}</SpecContext.Provider>
}

export { SpecContext, SpecProvider }
