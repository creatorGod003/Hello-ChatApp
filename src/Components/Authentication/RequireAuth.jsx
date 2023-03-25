import React from 'react'
import { Navigate,useLocation } from 'react-router-dom';
import { useAuth } from '../Context/Auth'

const RequireAuth = (props) => {

    const auth = useAuth();
    const location = useLocation();

    if(auth.user===null){
        return <Navigate to={"/login"} state={{path : location.pathname }}/>
    }
    console.log(auth)

  return (
    props.children
  )
}

export default RequireAuth