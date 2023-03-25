import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'
import ShowMessage from './ShowMessage';


// Message panel component which is responsible for showing messages

const MessagePanel = (props) => {

  const message = props.user.message;

  const mapper = []

  for (const [key, value] of message) {
    mapper.push([key, value])
  }

  return (
    <div className='bg-red-100 bg-pattern1 overflow-y-auto'>
      {
        
        mapper&&mapper.map((message, index) => { 
          return <ShowMessage key={index} message={message} />
        })
      }   
    </div>
  )
}

export default MessagePanel