import React, { useState } from 'react'
import UserContact from './UserContact'


const ContactList = () => {

  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState([

{
  userId: "ashutoshranjan003",
  username:  'Ashutosh Ranjan',
  userImg : 'Images/avatar1.jpeg',
  message :
    [ 
      ['Mon, 10 Apr 2023 15:16:40 GMT',"Hi bro how are you?"],
      ['Mon, 18 Apr 2023 16:16:40 GMT', "I am fine, what about you?"],
      ['Mon, 20 Apr 2023 17:16:40 GMT', "I am also fine, what are you doing?"],
    ]
  ,
},
{
  userId: "manishsaw238",
  username:  'Manish Saw',
  userImg : 'Images/avatar1.jpeg',
  message : 
    [ 
      ['Mon, 11 Apr 2023 15:16:40 GMT',"Hi bro how are you?"],
      ['Mon, 13 Apr 2023 16:16:40 GMT', "I am fine, what about you?"],
      ['Mon, 14 Apr 2023 17:16:40 GMT', "I am also fine, what are you doing?"],
    ]
  ,
},
{
  userId: "rahulkumar293",
  username:  'Rahul Kumar',
  userImg : 'Images/avatar1.jpeg',
  message :
    [ 
      ['Mon, 10 Apr 2023 15:16:40 GMT',"Hi bro how are you?"],
      ['Mon, 11 Apr 2023 16:18:40 GMT', "I am fine, what about you?"],
      ['Mon, 12 Apr 2023 17:19:40 GMT', "I am also fine, what are you doing?"],
    ]
  ,
},

]) 

  const [ anyContactSelected, setAnyContactSelected ] = useState(true)

  return (

    <div className='p-2 my-3 flex flex-col h-[75vh] justify-start overflow-y-auto cursor-pointer'>
        {
          userData.map((user, index) => {
            return <UserContact key={index} userData={user} contactSelect = {anyContactSelected} setContactSelect={setAnyContactSelected} />
          })
        }
    </div>

  )

}

export default ContactList