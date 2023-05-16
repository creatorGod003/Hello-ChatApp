import React from "react";
import ProfileData from "./ProfileData";
import ProfileDescription from "./ProfileDescription";
import { useNavigate } from "react-router-dom";
import ProfileName from "./ProfileName";

const EditProfile = () => {
  const navigate = useNavigate();

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
              data: "creatorGod003",
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
              data: "ranjan.ashutosh2003@gmail.com",
              editable: false,
            }}
          />
          <ProfileData
            props={{
              label: "Mobile Number",
              type: "text",
              data: "+919525437080",
              editable: false,
            }}
          />

          <ProfileDescription data={"namste 🙏"} />
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
