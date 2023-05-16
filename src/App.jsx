import Home from "./Components/Home/Home";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ChatPage from "./Components/Chat/ChatPage";
import Signup from "./Components/Authentication/Signup";
import Content from "./Components/Home/Content";
import About from "./Components/Home/About";
import RequireAuth from "./Components/Authentication/RequireAuth";
import ChatPanel from "./Components/Chat/ChatPanel/ChatPanel";
import { useDispatch, useSelector } from 'react-redux'
import Page404 from "./Components/Page404/Page404.jsx";
import { updateMobile } from "./features/Responsiveness/responsiveSlice";
import Login from "./Components/Authentication/Login";
import UserDashboard from "./Components/UserPage/UserDashboard";
import EditProfile from "./Components/UserPage/EditProfile";
import ProfileSetting from "./Components/UserPage/ProfileSetting";
import LoginUsingEmailOrNumber from "./Components/Authentication/LoginUsingEmailOrNumber";

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
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>} />
          <Route path="about" element={<About/>}/>
          <Route path="login-with-emailOrNumber" element={<LoginUsingEmailOrNumber/>}/>\
        </Route>

        <Route path="chat" element={
          <RequireAuth>
            <ChatPage/>
          </RequireAuth>
        }/>

        <Route path="user/:userid" element={<UserDashboard/>} />
        <Route path="user/:userid/edit" element={<EditProfile/>}/>
        <Route path="user/:userid/setting" element={<ProfileSetting/>} />

        {
          isMobile?<Route path="chatpanel" element={<ChatPanel user={user} />}/>:null
        }
              
        <Route path="*" element={<Page404/>} />
      </Routes>
    </>
  );
}

export default App;
