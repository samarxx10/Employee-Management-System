import React from 'react'
import Header from '../other/Header'
import Tasklistnumbers from '../other/Tasklistnumbers'
import Tasklist from '../Tasklist/Tasklist'

const EmployeeDashboard = ({data}) => {
  
  return (
    <div className='p-10 bg-[#1c1c1c] h-screen'>
     
        <Header data = {data} />
        <Tasklistnumbers data = {data}  />
        <Tasklist data = {data} />
    </div>
  )
}

export default EmployeeDashboard
