import React from "react";
import { firebaseAuth } from "../FirebaseConfigs/FirebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  signInWithRedirect,
  getAuth,
  linkWithCredential,
} from "firebase/auth";
import { useSelector } from "react-redux";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import { EmailAuthProvider } from "firebase/auth";

const LoginUsingGoogle = () => {
  const provider = new GoogleAuthProvider();
  const isMobile = useSelector((state) => {
    return state.responsive.isMobile;
  });
  const globalAuth = useAuth();
  const navigate = useNavigate();
  
  function addUserWithEmailPassword() {
    
    const auth = getAuth();

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      "123456"
    );
    linkWithCredential(auth.currentUser, credential)
      .then((usercred) => {
        const user = usercred.user;
        console.log("Account linking success", user);
      })
      .catch((error) => {
        console.log("Account linking error", error);
      });
  }

  function handleClick() {
    if (!isMobile) {
      handlePopUp();
    } else {
      handleRedirect();
    }
  }

  function handleRedirect() {
    signInWithRedirect(firebaseAuth, provider)
      .then(() => {
        getRedirectResult(firebaseAuth)
          .then((result) => {
            const user = result.user.currentUser;
            globalAuth.login(user);
            
            navigate("/home");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      })
      .catch((error) => {
        console.log("Inside Mobile handling error.");
      });
  }

  function handlePopUp() {
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const user = result.user;
        globalAuth.login(user);
        addUserWithEmailPassword();
        navigate("/home");
      })
      .catch((error) => {
        console.log("Handle Errors here.");
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  return (
    <button
      className="w-16 h-16 flex justify-center items-center"
      onClick={handleClick}
    >
      <img
        src="Images/google3.png"
        loading="eager"
        alt="Google"
        className="w-10 h-10"
      />
    </button>
  );
};

export default LoginUsingGoogle;
