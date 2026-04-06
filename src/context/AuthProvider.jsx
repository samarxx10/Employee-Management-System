import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'



export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userData , setUserData] = useState(null)

    useEffect(() => {
      setLocalStorage()
        const {employees,admin} = getLocalStorage()
        setUserData({employees,admin})
    }, [])
  return (
    <div> 
        <AuthContext.Provider value={{employees: userData?.employees, admin: userData?.admin, setUserData}}>
          {children}
        </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider
