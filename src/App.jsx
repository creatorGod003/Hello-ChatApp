import Home from "./Components/Home/Home";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ChatPage from "./Components/Chat/ChatPage";
import { Login } from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import Content from "./Components/Home/Content";
import About from "./Components/Home/About";
import RequireAuth from "./Components/Authentication/RequireAuth";
function App() {
  return (
    <>      
      <Routes>
        <Route path="/" element={<Home/>} >
          <Route index path="home" element={<Content/>} />
          <Route path="login" element={<Login/>} />
          <Route path="signup" element={<Signup/>} />
          <Route path="about" element={<About/>}/>
        </Route>
        <Route path="chat" element={
          // <RequireAuth>
            <ChatPage/>
          // </RequireAuth>
        } />
      </Routes>
    </>
  );
}

export default App;
