import { InitialStateType } from './SpecContext'

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
};

export enum Types {
  UPDATE = 'UPDATE_DATA',
  LOADING = 'LOADING_DATA'
}

// Type Definitions for Action Creators
interface AppPayload {
  [Types.UPDATE]: {
    payload: any
  }
  [Types.LOADING]: {

  }
}
// interface LoadingDataPayload {
//   readonly type: Types.LOADING
// }

// export type SpecActions = ActionMap<UpdateDataPayload>[keyof ActionMap<UpdateDataPayload>];
// export type LoadingActions = ActionMap<LoadingDataPayload>[keyof ActionMap<LoadingDataPayload>];

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

// export type DataActions = | SpecActions | LoadingActions

// export type AppActions =
//   | UpdateDataPayload
//   | LoadingDataPayload t

export const appReducer = (state: InitialStateType, action: AppActions) => {
  switch (action.type) {
    case Types.LOADING:
      return {
        ...state,
        loading: true
      };
    case Types.UPDATE:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
