import React, { useState, useEffect, useRef } from "react";
import UserContact from "./UserContact";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../FirebaseConfigs/FirebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";
import { addContacts } from "../../../features/ContactSelect/contactSelectSlice";

const ContactList = () => {
  
  const [userData, setUserData] = useState([]);
  const userDataRef = useRef([]);

  const loggedInUser = useSelector((state) => {
    return state.userSignIn.user;
  });
  const dispatch = useDispatch();
  const numberOfContact = useRef(0);

  async function fetchUserData() {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().email !== JSON.parse(loggedInUser).email) {
        userDataRef.current.push(doc.data());
        numberOfContact.current += 1;
      }
    });

    dispatch(addContacts(numberOfContact.current));
    setUserData(userDataRef.current);
  }

  useEffect(() => {
    
    if(userData.length === 0){
      fetchUserData();
    }

  }, []);

  return (
    <div className="p-2 my-3 flex flex-col h-[75vh] justify-start overflow-y-auto">
      {userData.map((user, index) => {
        return <UserContact key={index} index={index} userData={user} />;
      })}
    </div>
  );
};

export default ContactList;
