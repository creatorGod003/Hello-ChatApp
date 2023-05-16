import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, firebaseAuth } from "../FirebaseConfigs/FirebaseConfig";
import { useAuth } from "../Context/Auth";
import { doc, getDoc } from "firebase/firestore";
import { login } from "../../features/user/userLoginSlice";
import { useDispatch } from "react-redux";


const LoginUsingEmailOrNumber = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requireEmail, setRequireEmail] = useState(false);
  const [requirePassword, setRequirePassword] = useState(false);
  const [invalidDetails, setInvalidDetails] = useState(false);
  const globalAuth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function resetFields() {
    setEmail("");
    setPassword("");
    setRequireOff();
  }

  async function handleSignIn(e) {

    e.preventDefault();

    if (email === "") {
      setRequireEmail(true);
    }
    if (password === "") {
      setRequirePassword(true);
    }

    if (email === "" || password === "") {
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gm;
    const numberRegex = /^[+0-9]+$/;
    let credential = "";

    if (email.match(emailRegex) == null && email.match(numberRegex) !== null) {
      const docRef = doc(db, "email_number_mapping", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document found");
        credential = docSnap.data().email;
      } else {
        console.log("No such document exist!");
        setInvalidDetails(true);
        return;
      }
    } else if (email.match(emailRegex) !== null) {
      credential = email;
    } else {
      console.log("Invalid number or email 1st if");
      setInvalidDetails(true);
      return;
    }

    console.log("credential are : ", credential);

    signInWithEmailAndPassword(firebaseAuth, credential, password)
      .then((userCredential) => {
        const user = userCredential.user;
        globalAuth.login(user);
        dispatch(login(JSON.stringify(user)));
        resetFields();
        navigate("/home");
      })
      .catch((error) => {
        setInvalidDetails(true);
        alert(error.message);
      });
  }

  function setRequireOff() {
    setRequireEmail(false);
    setRequirePassword(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b to-teal-300 from-indigo-500 flex flex-col justify-center items-center">
      <div className="flex flex-col w-[70%] sm:w-[40%] md:w-[30%] lg:w-[25%] mx-auto border border-slate-800 rounded-2xl shadow-2xl p-2 bg-white">
        <form action="" className="flex flex-col items-left">
          <label
            htmlFor="email_num"
            className="flex flex-col font-bold text-slate-800"
          >
            <span className="m-2 ">Email or Number</span>
            <span
              className={`${
                requireEmail ? "block" : "hidden"
              } text-red-500 m-2`}
            >
              *Required
            </span>
            <input
              autoComplete={"on"}
              className="m-2 p-3 border border-slate-600 rounded-md bg-slate-100 placeholder-gray-600 font-normal"
              onChange={(e) => {
                setEmail(e.target.value);
                setRequireOff();
                setInvalidDetails(false);
              }}
              value={email}
              name="email_num"
              type="text"
              placeholder="Enter your email or number with country code"
            />
          </label>

          <label
            htmlFor="password"
            className="flex flex-col font-bold text-slate-800"
          >
            <span className="m-2 ">Password</span>
            <span
              className={`${
                requirePassword ? "block" : "hidden"
              } text-red-500 m-2`}
            >
              *Required
            </span>
            <input
              className="m-2 p-3 border border-slate-600 rounded-md bg-slate-100 placeholder-gray-600  font-normal"
              onChange={(e) => {
                setPassword(e.target.value);
                setRequireOff();
                setInvalidDetails(false);
              }}
              value={password}
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="on"
            />
          </label>

          <div className="text-left m-2">
            <label htmlFor="" className="flex flex-row items-center ">
              <input type="checkbox" name="" id="" />

              <span className="text-slate-800 mx-2">Remember me</span>
            </label>
          </div>

          <button
            className="p-3 m-2 border border-slate-800 rounded bg-blue-500 text-white cursor-pointer"
            onClick={(e) => handleSignIn(e)}
          >
            Sign In
          </button>

          <div className="text-red-500 text-center m-2">
            {invalidDetails ? "Invalid credentials" : ""}
          </div>
        </form>
        <div className="mx-auto my-2 text-sm">
          Don't have an account?{" "}
          <Link to={"/signup"} className="underline font-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginUsingEmailOrNumber;
