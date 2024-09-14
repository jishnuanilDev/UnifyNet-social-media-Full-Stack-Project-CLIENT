import React, { Children, useState } from 'react'
import { createContext } from 'react'

export const userContext = createContext();


export const UserContextProvider = ()=> {
    const [user,setUser] = useState(null);
    const saveUser = (userData)=>{
        setUser(userData);
        localStorage.setItem('user',JSON.stringify(userData))
          } 
  return (
    <userContext.Provider value={{user,saveUser}}>
        {Children}
    </userContext.Provider>
  )
}

export default userContext;

