import React from 'react'

// User info component which is responsible for showing user info at the top of chat panel
const UserInfo = (props) => {

  return (
    <div className='bg-blue-400 flex items-center'>
        <div className='flex items-center'>
            <img src={props.user.userImg} alt="" className='w-12 h-12 rounded-full' />
            <div className='ml-2'>
                {props.user.username}
            </div>
        </div>
    </div>
  )
}

export default UserInfo