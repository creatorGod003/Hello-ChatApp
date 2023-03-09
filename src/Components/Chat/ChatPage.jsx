import React from 'react'
import Contact from './Contact/Contact'
import UserChat from './UserChat/UserChat'

const ChatPage = () => {
  return (
    <div className='grid w-screen grid-rows-7 grid-cols-7'>
      <Contact/>
      <UserChat/>
    </div>
  )
}

export default ChatPage