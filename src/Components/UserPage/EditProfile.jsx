import React, { useEffect, useState } from "react";
import ProfileData from "./ProfileData";
import ProfileDescription from "./ProfileDescription";
import { useNavigate } from "react-router-dom";
import ProfileName from "./ProfileName";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfigs/FirebaseConfig";

const EditProfile = () => {
  const navigate = useNavigate();
  const loggedInUserId = useSelector((state) => state.userSignIn.userId);
  const loggedInUserEmail = useSelector((state) => JSON.parse(state.userSignIn.user).email); 
  const [userNumber, setUserNumber] = useState("");
  
  function getUserNumber(){

    const userDocRef = doc(db, "users", loggedInUserEmail);
    getDoc(userDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserNumber(docSnap.data().phone)
        // console.log(docSnap.data().phone)
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  }

  useEffect(()=>{
    getUserNumber()
  }, [])

  return (
    <div className="grid grid-rows-[150px_1fr] grid-cols-1 h-screen ">
      <div className="rounded-b-lg text-white flex items-center justify-around bg-gradient-to-b from-blue-500 to-teal-500">
        <div className="h-full flex flex-col items-center p-4">
          <span className="font-bold text-3xl">Profile Details</span>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <ProfileData
            props={{
              label: "UserId",
              type: "text",
              data: loggedInUserId,
              editable: false,
            }}
          />
          <ProfileName
            props={{
              label: "name",
              type: "text",
              editable:true
            }}
          />
          <ProfileData
            props={{
              label: "Email",
              type: "email",
              data: loggedInUserEmail,
              editable: false,
            }}
          />
          <ProfileData
            props={{
              label: "Mobile Number",
              type: "text",
              data: userNumber,
              editable: false,
            }}
          />

          <ProfileDescription data={"Hi, There"} />
        </div>

        <div className="mx-200 w-full text-center my-8">
          <button
            type="button"
            className="mx-4 my-2 rounded-md p-2.5 text-white bg-blue-600"
            onClick={()=>{navigate(-1)}}
          >
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
