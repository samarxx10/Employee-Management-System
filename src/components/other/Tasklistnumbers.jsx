import React from 'react'

const Tasklistnumbers = ({data}) => {
  return (
    <div className='flex mt-10 justify-between gap-5 screen'>

        <div className='rounded-xl w-[45%] py-6 px-9 bg-red-400'> 
        <h2 className='text-2xl font-semibold'>{data.taskCounts.newTask}</h2>
        <h3 className='text-xl font-medium'>New task</h3>
        </div>
        <div className='rounded-xl w-[45%] py-6 px-9 bg-green-400'> 
        <h2 className='text-2xl font-semibold'>{data.taskCounts.completed}</h2>
        <h3 className='text-xl font-medium'>Completed task</h3>
        </div>
        <div className='rounded-xl w-[45%] py-6 px-9 bg-blue-400'> 
        <h2 className='text-2xl font-semibold'>{data.taskCounts.active}</h2>
        <h3 className='text-xl font-medium'>Accepted task</h3>
        </div>
        <div className='rounded-xl w-[45%] py-6 px-9 bg-yellow-400'> 
        <h2 className='text-2xl font-semibold'>{data.taskCounts.failed}</h2>
        <h3 className='text-xl font-medium'>Failed task</h3>
        </div>
      
    </div>
  )
}

export default Tasklistnumbers
