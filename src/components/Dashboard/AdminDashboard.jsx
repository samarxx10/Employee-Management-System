import React from 'react'
import Header from '../other/Header'
import TaskAnalytics from '../Analytics/TaskAnalytics'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import LeaveRequests from '../Leave/LeaveRequests'

const AdminDashboard = () => {
  return (
    <div className='min-h-screen w-full overflow-y-auto p-10'>
      <Header />
      <TaskAnalytics />
      <CreateTask />
      <AllTask />
      <LeaveRequests />
    </div>
  )
}

export default AdminDashboard
