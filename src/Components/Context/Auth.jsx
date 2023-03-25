import { createContext } from "react";
import { useContext, useState } from "react";


const AuthContext = createContext();

const useAuth = ()=>{
    return useContext(AuthContext);
}

const AuthState = (props)=>{
    const[userConfig, setUserConfig] = useState(null);
    function login(user){
        setUserConfig(user);
    }
    function logout(){
        setUserConfig(null);
    }

    return ( <AuthContext.Provider value={{user:userConfig, login, logout}} >
        {props.children}
    </AuthContext.Provider>
    )

}

export {useAuth, AuthContext, AuthState}