import React, { useReducer, createContext} from 'react'
import {AppReducer, SpecActions} from './AppReducer'

type DataType = {
    data: JSON;
}

type InitialStateType = {
    data: DataType[];
}

const initialState = {
    data: []
}

const SpecContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>
}>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = (
    { data }: InitialStateType, 
    action: SpecActions
) => ({
    data: AppReducer(data, action)
});

const SpecProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
  
    return (
      <SpecContext.Provider value={{ state, dispatch }}>
        { children }
      </SpecContext.Provider>
    );
  };

export { SpecContext, SpecProvider }