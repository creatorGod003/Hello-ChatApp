import React from 'react'
import MessageEditor from './MessageEditor'
import MessagePanel from './MessagePanel'
import UserInfo from './UserInfo'


// Chat panel component which is responsible for showing user info, message panel and message editor

const ChatPanel = (props) => {

  console.log(props.user, 'from chat panel')
  
  return (
    <div className="row-span-full col-start-3 col-end-8 bg-gray-500 grid grid-rows-[60px,1fr,80px] grid-cols-1 h-screen">
      <UserInfo user={props.user}/>
      <MessagePanel user={props.user}/>       
      <MessageEditor/>
    </div>
  )
}

export default ChatPanel