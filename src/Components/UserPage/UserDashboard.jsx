import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../FirebaseConfigs/FirebaseConfig';
import { useAuth } from '../Context/Auth';

const UserDashboard = () => {
    const params = useParams();
    const userId = params.userid;
    const globalAuth = useAuth();
    const [invalidUser, setInvalidUser] = useState(false);

    const [userEmail,setUserEmail] = useState("")
    // const [userImg, setUserImg] = useState("")
    const [userName, setUserName] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userPhoneNumber, setUserPhoneNumber] = useState("")
    

    async function fetchDataFromFirebase(){
        // fetch data from firebase
      const docRef = doc(db, `/users`, userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data(); 
        setUserEmail(data.email)
        setUserName("No name")
        
      } else {
        console.log("No such document!");
      }

    }

    useEffect(() => {

        if(globalAuth.user!==null && userId!==globalAuth.user.uid)
            fetchDataFromFirebase()
        else{
            setInvalidUser(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div>
        {invalidUser?(<>Invalid User</>):(
            <div>Welcome {userId}</div>
        )}
    </div>
  )
}

export default UserDashboard