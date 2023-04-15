import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// User info component which is responsible for showing user info at the top of chat panel
const UserInfo = (props) => {

  const navigate = useNavigate();
  const isMobile = useSelector((state)=>{return state.responsive.isMobile}) 

  return (
    <div className="bg-blue-400 flex items-center ">
      
        {
          isMobile?<button onClick={()=>{navigate(-1)}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 30 30"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>:null
        }
        <div className="flex items-center mx-4">
          <div className="flex items-center">
            <img
              src={props.user.userImg}
              alt=""
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="ml-2">{props.user.username}</div>
        </div>
  </div>
);
}
export default UserInfo;
