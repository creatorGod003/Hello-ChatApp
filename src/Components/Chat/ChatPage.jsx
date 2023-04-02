import Contact from './Contact/Contact'
import ChatPanel from './UserChat/ChatPanel'
import MyChatPanel from './UserChat/MyChatPanel'

import { useSelector } from 'react-redux'

const ChatPage = () => {

  const user = useSelector((state)=> {return state.user.user});

  return (
    <div className='h-screen '>
      <Contact/>
    </div>
  )

}

export default ChatPage