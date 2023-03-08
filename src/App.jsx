import Home from "./Components/Home/Home";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ChatPage from "./Components/Chat/ChatPage";
import { Login } from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
function App() {
  return (
    <>      
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/chat" element={<ChatPage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </>
  );
}

export default App;
