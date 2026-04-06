import React, { useContext, useEffect } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'
import { useState } from 'react'
import { AuthContext } from './context/AuthProvider'



const App = () => {
  const [user , setUser] = useState(null)
  const [loggedInUserData,setLoggedInUserData] = useState(null)
  const authData  = useContext(AuthContext)
  
  useEffect(() => {
    if(authData && user === 'employee') {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
        if(loggedInUser) {
            // Find fresh employee data from updated context
            const updatedEmployee = authData.employees.find(
                (e) => e.email === loggedInUser.data.email
            )
            if(updatedEmployee) {
                setLoggedInUserData(updatedEmployee)
            }
        }
    }
}, [authData])
  
  

  const handleLogin = (email,password)=>{
    if(email == 'admin@me.com' && password == '123'){
      setUser('admin')
      localStorage.setItem('loggedInUser',JSON.stringify({role:'admin'}))
      
    }else if(authData){
      const employee = authData.employees.find((e) => email == e.email && e.password == password)
      if(employee){
        setUser('employee')
        setLoggedInUserData(employee)
       
        localStorage.setItem('loggedInUser',JSON.stringify({role:'employee',data:employee}))
      }
      
      
    }
    else{
      alert("Invalid Credentials")
    }
  }
  const data = useContext(AuthContext)
  return (
    <>
     {!user ? <Login handleLogin = {handleLogin} /> : ''}
     {user == 'admin' ? <AdminDashboard /> : (user == 'employee' ? <EmployeeDashboard  data={loggedInUserData} />  : null)}
     
    </>
  )
}

export default App
