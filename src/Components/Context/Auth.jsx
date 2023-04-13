import { createContext } from "react";
import { useContext, useState } from "react";


const AuthContext = createContext();

const useAuth = ()=>{
    return useContext(AuthContext);
}

const AuthState = (props)=>{
    const[userConfig, setUserConfig] = useState({
        userId:'ashutoshranjan003',
        username:  'Ashutosh Ranjan',
        userImg : 'Images/avatar1.jpeg',
        message :
            [ 
                ['Mon, 10 Apr 2023 15:16:40 GMT',"Hi bro how are you?"],
                ['Mon, 13 Apr 2023 16:16:40 GMT', "I am fine, what about you?"],
                ['Mon, 14 Apr 2023 17:16:40 GMT', "I am also fine, what are you doing?"],
            ]
        ,
    });
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