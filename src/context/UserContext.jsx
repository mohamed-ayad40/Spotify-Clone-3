import React, { useState } from 'react'
export const ReactContext =  React.createContext({});




const UserContext = ({children}) => {
    const [user, setUser] = useState({});
  return (
    <ReactContext.Provider value={{user, setUser}}>
        {children}
    </ReactContext.Provider>
  )
}

export default UserContext