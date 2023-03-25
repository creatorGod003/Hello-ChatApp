import Contact from './Contact/Contact'
import ChatPanel from './UserChat/ChatPanel'
import MyChatPanel from './UserChat/MyChatPanel'

import { useSelector } from 'react-redux'

const ChatPage = () => {

  const user = useSelector((state)=> {return state.user.user})
  
  return (
    <div className='grid w-screen h-screen grid-rows-7 grid-cols-7  overflow-x-hidden overflow-y-hidden'>
      {/* Conditional rendering of chat panel if user selected from contact list otherwise show default ui which is My chat Panel */}
      <Contact/>
      {
        user ? <ChatPanel user={user}></ChatPanel>:<MyChatPanel/>
      }      
    </div>
  )

}

export default ChatPage