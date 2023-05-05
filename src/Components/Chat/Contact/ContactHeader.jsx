import React, { useState } from 'react'
import Search from './Search'
import { useAuth } from '../../Context/Auth';
import { useNavigate } from 'react-router-dom';


// Contact header component which is responsible for dispalying search bar and logout button

const ContactHeader = () => {

   const globalAuth = useAuth();
   const navigate = useNavigate();

  return (
    <div className="p-4 border-b-4 border-white text-center md:text-left">
        <header className="flex justify-between text-2xl text-white p-2 mb-4">
          <span className='font-bold font-serif'>Hello</span>
          <button 
            className='text-lg bg-blue-600 p-1 rounded-md'
            onClick={()=>{
              globalAuth.logout();
              navigate("/home")
            }}
          >
            logout
          </button>
        </header>
        <Search/>
      </div>
  )
}

export default ContactHeader