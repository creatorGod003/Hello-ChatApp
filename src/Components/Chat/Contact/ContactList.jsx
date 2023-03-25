import React, { useState } from 'react'
import UserContact from './UserContact'


// Contact list component which is responsible for showing list of contact with which user can chat

const ContactList = () => {

  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState([

{

  username:  'Ashutosh Ranjan',
  userImg : 'Images/avatar1.jpeg',
  message : new Map(
    [ 
      ["25-03-2023", ["Me accha hun tum batao", "bohot yaad aa rhi hai yaar school time ki"]], 
      ["26-03-2023", ["Hello", "How are you?", "Hope you are doing well" ]]
    ]
  ),
},
{
  username:  'Manish Saw',
  userImg : 'Images/avatar1.jpeg',
  message : new Map(
    [ 
      ["25-03-2023", ["Hello", "How are you?", "Hope you are doing well" ]], 
      ["26-03-2023", ["Hello", "How are you?", "Hope you are doing well" ]]
    ]
  ),
},
{
  username:  'Rahul Kumar',
  userImg : 'Images/avatar1.jpeg',
  message : new Map(
    [ 
      ["25-03-2023", ["Hello", "How are you?", "Hope you are doing well" ]], 
      ["26-03-2023", ["Hello", "How are you?", "Hope you are doing well" ]],
      ["28-03-2023", ["Hello", "How are you?", "Hope you are doing well" ]], 
      ["29-03-2023", ["Hello", "How are you?", "Hope you are doing well" ]],
      ["30-03-2023", ["Hello", "How are you?", "Hope you are doing well" ]], 
      ["31-03-2023", ["Hello", "How are you?", "Hope you are doing well" ]],
      ["01-04-2023", ["Hello", "How are you?", "Hope you are doing well" ]],
      ["01-04-2023", ["Hello", "How are you?", "Hope you are doing well" ]],
    ]
  ),
}

]) 

  const [ anyContactSelected, setAnyContactSelected ] = useState(true)

  return (

    <div className='p-4 my-4 flex flex-col h-[75vh] justify-start overflow-y-auto cursor-pointer select-none'>
        {
          userData.map((user, index) => {
            return <UserContact key={index} userData={user} contactSelect = {anyContactSelected} setContactSelect={setAnyContactSelected} />
          })
        }
    </div>

  )

}

export default ContactList