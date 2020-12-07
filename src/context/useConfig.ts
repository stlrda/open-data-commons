import { useReducer } from 'react'
import { DataCommonsConfig } from '../mocks/config2'

interface IConfigContextState {
  config: DataCommonsConfig.Config
  error: string | null
}

interface ISetConfigAction {
  readonly type: "SET_CONFIG"
  config: DataCommonsConfig.Config
}
interface ISetErrorAction {
  readonly type: "SET_ERROR"
  error: string | null
}

type IConfigContextActions = ISetConfigAction | ISetErrorAction

export const defaultInitialState = {
  config: {},
  error: null
}

function useConfig(initialState: IConfigContextState) {
  let [state, dispatch] = useReducer((state: IConfigContextState, action: IConfigContextActions) => {
    switch(action.type) {
      case "SET_CONFIG":
        return {...state, config: action.config }
      case "SET_ERROR":
        return {...state, error: action.error }
      default:
        return state;
    }
  }, initialState)

  return [state, dispatch]
}

export default useConfig;
