import React from "react";


const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {
    return (
        <GlobalContext.Provider>
            {children}
        </GlobalContext.Provider>
    )
}