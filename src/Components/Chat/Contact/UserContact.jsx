import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {updateuser} from '../../../features/user/userSlice'
import {useNavigate} from 'react-router-dom'

// User contact component which is responsible for showing user contact showing its image, username along with last message and time
const UserContact = (props) => {
  
  const dispatch = useDispatch()
  const [selected, setSelected] = useState(false)
  const navigate = useNavigate()

  const toggleSelect = ()=>{

    dispatch(selected?updateuser(null):updateuser(props.userData))
    navigate('/chatpanel')

  }

  return (
    <div className={` ${selected?"bg-gray-500 rounded-lg":"bg-inherit"} flex justify-around items-center p-2`} onClick={()=>{toggleSelect()}}>
      <img src={props.userData.userImg} alt="" className='w-16 h-16 rounded-full' />
      <div className='basis-3/4 text-white'>
        <div>{props.userData.username}</div>
        <div className='flex justify-between'>
          <p>This is the last message</p>
          <span>6/11</span>
        </div>
      </div>
    </div>
  )
}

export default UserContact