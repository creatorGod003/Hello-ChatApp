import React from 'react'
import UserContact from './UserContact'

const ContactList = () => {
  return (
    <div className='p-4 flex flex-col justify-around overflow-auto'>

        <UserContact/>
        <UserContact/>
        <UserContact/>
        <UserContact/>
        <UserContact/>
        <UserContact/>
        <UserContact/>
        <UserContact/>
        
    </div>
  )
}

export default ContactList