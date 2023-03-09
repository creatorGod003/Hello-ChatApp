import React from 'react'

const UserContact = () => {
  return (
    <div className='flex justify-around items-center p-2 hover:bg-gray-500 hover:rounded-lg'>
      <img src="Images/avatar1.jpeg" alt="" className='w-16 h-16 rounded-full' />
      <div className='basis-3/4 text-white'>
        <div>Ashutosh Ranjan</div>
        <div className='flex justify-between'>
          <p>This is the last message</p>
          <span>6/11</span>
        </div>
      </div>
    </div>
  )
}

export default UserContact