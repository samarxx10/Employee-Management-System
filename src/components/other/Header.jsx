import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({data}) => {
  const navigate = useNavigate()

  const logOutUser = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/')
  }
  
  return (
    <div className='flex items-end  justify-between'>
      <h1 className='text-2xl font-medium'>Hello <br /> <span className='text-3xl font-semibold'>{data && data.firstName ? data.firstName : "User"} 👋 </span> </h1>
      <button onClick={logOutUser} className='bg-red-600 text-lg font-medium px-2 py-2'>Log Out</button>
    </div>
  )
}

export default Header

