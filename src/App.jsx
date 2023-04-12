import Home from "./Components/Home/Home";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ChatPage from "./Components/Chat/ChatPage";
import { Login } from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import Content from "./Components/Home/Content";
import About from "./Components/Home/About";
import RequireAuth from "./Components/Authentication/RequireAuth";
import ChatPanel from "./Components/Chat/UserChat/ChatPanel";
import { useDispatch, useSelector } from 'react-redux'
import Page404 from "./Components/Page404/Page404.jsx";
import { updateMobile } from "./features/Responsiveness/responsiveSlice";

function App() {

  const user = useSelector((state)=> {return state.user.user})

  const dispatch = useDispatch();
  dispatch(updateMobile())
  const isMobile = useSelector((state)=>{return state.responsive.isMobile})

  return (
    <>      
      <Routes>
        <Route path="/" element={<Home/>} >
          <Route path="home" element={<Content/>} />
          <Route path="login" element={<Login/>} />
          <Route path="signup" element={<Signup/>} />
          <Route path="about" element={<About/>}/>
        </Route>
        <Route path="chat" element={
          // <RequireAuth>
            <ChatPage/>
          // </RequireAuth>
        }/>

        {
          isMobile?<Route path="chatpanel" element={<ChatPanel user={user} />}/>:""
        }
              
        <Route path="*" element={<Page404/>} />
      </Routes>
    </>
  );
}

export default App;
