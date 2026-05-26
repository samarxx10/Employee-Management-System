import React from 'react'
import Header from '../other/Header'
import Tasklistnumbers from '../other/Tasklistnumbers'
import Tasklist from '../Tasklist/Tasklist'
import RequestLeave from '../Leave/RequestLeave'

const EmployeeDashboard = ({data}) => {
  
  return (
    <div className='min-h-screen overflow-y-auto bg-[#1c1c1c] p-10'>
        <Header data = {data} />
        <div className='mt-6 grid gap-6 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <Tasklistnumbers data = {data}  />
            <Tasklist data = {data} />
          </div>
          <RequestLeave data={data} />
        </div>
    </div>
  )
}

export default EmployeeDashboard
