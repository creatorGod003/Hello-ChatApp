import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updateuser} from '../../../features/user/userSlice'
import {useNavigate} from 'react-router-dom'
import { deselectContact, resetContact, selectContact } from '../../../features/ContactSelect/contactSelectSlice'

// User contact component which is responsible for showing user contact showing its image, username along with last message and time
const UserContact = (props) => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isMobile = useSelector((state)=>{return state.responsive.isMobile}) 
  const index = props.index;
  
  const selected = useSelector((state)=>{return JSON.parse(state.contactSelect.contactSelect)[index]})

  const onSelect = ()=>{
    
      dispatch(selectContact(index))
      dispatch(updateuser(props.userData))

    if(isMobile)
      navigate('/chatpanel')

  }

  return (
    <div className={` ${selected?"bg-gray-500 rounded-lg":"bg-inherit"} flex justify-around items-center p-2 my-1`} onClick={onSelect}>
      <img src={"/Images/avatar1.jpeg"} alt="" className='w-16 h-16 rounded-full' />
      <div className='basis-3/4 text-white'>
        <div>{props.userData.username}</div>
        {/* <div className='flex justify-between'>
          <p>{props.userData.description}</p>
        </div> */}
      </div>
    </div>
  )
}

export default UserContact