import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../FirebaseConfigs/FirebaseConfig";

const ProfileName = ({ props }) => {

  const [name, setName] = useState("")
  const [editable, setEditable] = useState(false);
  const [showButton, setShowButton] = useState(false);  
  const defaultEditable = props.editable;
  const loggedInUser= useSelector((state)=>{return state.userSignIn.user}) 

  window.onbeforeunload = (event) => {
    if(showButton){
      event.preventDefault();
      event.returnValue = '';
    }
  };


  async function updateName(){
  
    if(loggedInUser!==null){

      const obj = JSON.parse(loggedInUser)
      setEditable(false)
      setShowButton(false)
      document.getElementById("name").style.backgroundColor  = "rgb(226,232,240)";
      const userDocRef = doc(db, 'users', obj.email);
      setDoc(userDocRef, { name: name }, { merge: true });

    }

}

  async function renderName(){

    if(loggedInUser!==null){

      const obj = JSON.parse(loggedInUser);
      const userDocRef = doc(db, "users", obj.email);
      const userSnap = await getDoc(userDocRef);
      
      if(userSnap.exists()){
        setName(userSnap.data().name)
      }
      else{
        console.log("No document found")
      }

    }
    
  }

  useEffect(()=>{
    renderName()
  },[])

  return (
    <div className="my-2">
      <label
        htmlFor={props.label}
        className="flex flex-col mx-4 text-xl relative"
      >
        <span className="px-2 font-bold">{props.label}</span>
        <div className="relative">
          <input
            type={props.type}
            value={name}
            id={props.label}
            className=" p-2 rounded-md w-full bg-slate-200 border-2 border-gray-400"
            readOnly={!editable}
            placeholder={`Enter your ${props.label} here...`}
            onChange={(e) => {
              setShowButton(true);
              setName(e.target.value);
            }}
          />
          {
            defaultEditable && (
              <button
            className="absolute top-2 right-0"
            onClick={() => {
                setEditable(true)
                document.getElementById(props.label).focus();
                document.getElementById(props.label).style.backgroundColor  = "white";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
            )
          }
        </div>
      </label>

      {showButton && (
        <button
          type="button"
          className="mx-4 my-2 rounded-md p-2.5 text-white bg-blue-600"
          onClick={
            updateName
          }
        >
          Apply Changes
        </button>
      )}
    </div>
  );
};

export default ProfileName;
