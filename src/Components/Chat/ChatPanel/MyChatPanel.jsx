import React from 'react'


// Responsible for showing this chat panel when no user is selected from contact list
const MyChatPanel = () => {
  return (
    <div className='flex flex-col justify-center items-center row-span-full col-start-3 col-end-8 opacity-70'>
        <div className='border-blue-600 border-4 inline-block rounded-full p-4'>
          <img src="Images/hello-chatpage.gif" alt="" className='w-40 h-40' />
        </div>
        <div className='m-6 font-bold text-2xl opacity-100'>Have Your Chat Now!</div>
    </div>
  )
}

export default MyChatPanel