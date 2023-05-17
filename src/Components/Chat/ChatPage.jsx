import { updateMobile } from '../../features/Responsiveness/responsiveSlice.js'
import Contact from './Contact/Contact'
import ChatPanel from './ChatPanel/ChatPanel.jsx'
import MyChatPanel from './ChatPanel/MyChatPanel.jsx'

import { useDispatch, useSelector } from 'react-redux'

const ChatPage = () => {

  const user = useSelector((state)=> {return state.user.user});
  const isMobile = useSelector((state)=>{return state.responsive.isMobile}) 
  const dispatch = useDispatch()
  dispatch(updateMobile())
  console.log('isMobile', isMobile)

  return (
    <div className='h-screen'>
      {
        isMobile?<Contact/>:
        
        (
          <div className='grid w-screen h-screen grid-rows-7 grid-cols-7  overflow-x-hidden overflow-y-hidden'> 
            <Contact/>
            {(user===null)?<MyChatPanel/>:<ChatPanel user={user}/>}
          </div>
          
        )
      }
    </div>
  )

}

export default ChatPage