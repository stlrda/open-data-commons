// @ts-nocheck

import React, { useState, createContext, useReducer } from 'react'




export const UIContext = createContext()

export const UIProvider = ({ children }) => {
    const [loading, changeLoading] = useState(true)
    const [error, setError] = useState(null)
        //actions
        
        const isLoading = (result) => {
            changeLoading(result)
        }
        const handleError = (e) => {
            setError(e)
        }

    return(
        <UIContext.Provider value={{
                loading,
                isLoading,
                error,
                handleError
        }}>
            { children }
        </UIContext.Provider>
    )
}