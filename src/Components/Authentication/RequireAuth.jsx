import React from 'react'
import { Navigate,useLocation } from 'react-router-dom';
import { useAuth } from '../Context/Auth'

const RequireAuth = (props) => {

    const globalAuth = useAuth();
    const location = useLocation();

    if(globalAuth.user===null){
        return <Navigate to={"/login"} state={{path : location.pathname }}/>
    }
    console.log(globalAuth.user)

  return (
    props.children
  )
}

export default RequireAuth