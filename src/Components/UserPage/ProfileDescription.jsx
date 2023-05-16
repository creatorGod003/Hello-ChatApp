import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../FirebaseConfigs/FirebaseConfig";
import { useSelector } from "react-redux";

const ProfileDescription = (props) => {
  const [editable, setEditable] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const [description, setDescription] = useState("");
  const loggedInUser = useSelector((state) => {
    return state.userSignIn.user;
  });

  async function updateDescription() {
    if (loggedInUser !== null) {
      const obj = JSON.parse(loggedInUser);
      setEditable(false);
      setShowButton(false);
      document.getElementById("description").style.backgroundColor =
        "rgb(226,232,240)";
      const userDocRef = doc(db, "users", obj.email);
      setDoc(userDocRef, { description: description }, { merge: true });
    }
  }

  async function renderDescription() {
    if (loggedInUser !== null) {
      const obj = JSON.parse(loggedInUser);
      const userDocRef = doc(db, "users", obj.email);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        setDescription(userSnap.data().description);
      } else {
        console.log("No document found");
      }
    }
  }

  useEffect(() => {
    renderDescription();
  }, []);

  window.onbeforeunload = (event) => {
    if (showButton) {
      event.preventDefault();
      event.returnValue = "";
    }
  };

  return (
    <div className="flex justify-center flex-col mx-4 relative">
      <span className="px-2 font-bold text-xl">Description</span>
      <div>
        <textarea
          name="description"
          id="description"
          className="w-full rounded-md p-2 placeholder-slate-600 bg-slate-200 border-2 border-gray-400 shadow-sm"
          placeholder="Enter your description here..."
          disabled={!editable}
          value={description}
          onChange={(e) => {
            setShowButton(true);
            setDescription(e.target.value);
          }}
        ></textarea>
        <button
          className="absolute right-0 z-10"
          onClick={() => {
            setEditable(true);
            console.log("clicked");
            document.getElementById("description").style.backgroundColor =
              "white";
            document.getElementById("description").focus();
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
      </div>

      {showButton && (
        <button
          type="button"
          className="mx-4 my-2 rounded-md p-2.5 text-white bg-blue-600"
          onClick={updateDescription}
        >
          Apply Changes
        </button>
      )}
    </div>
  );
};

export default ProfileDescription;
