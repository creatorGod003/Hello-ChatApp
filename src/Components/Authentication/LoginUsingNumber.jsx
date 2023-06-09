import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { useAuth } from "../Context/Auth";



import app from "../FirebaseConfigs/FirebaseConfig";
import { Rings } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const LoginUsingNumber = () => {
  const [countrycode, setCountrycode] = useState("+91");
  const [number, setNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const auth = getAuth(app);
  const [onProgress, setOnProgress] = useState(false);
  const [userOTP, setUserOTP] = useState("");
  const [verified, setVerified] = useState("");
  const [actionStatus, setActionStatus] = useState("");
  const navigate = useNavigate();

  const globalAuth = useAuth();

  useEffect(() => {
    setPhoneNumber(countrycode + number);
  }, [number, countrycode]);

  function setUpRecaptcha() {
    setOnProgress(true);
    console.log("captcha verification setup");
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          console.log("captcha resolved");
        },
        "expired-callback": () => {
          console.log("Captcha not verified");
        },
      },
      auth
    );
    handleSignIn();
  }

  function handleSignIn() {
    console.log("Sign is being handled");

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log("SMS sent successfully");
        setActionStatus("SMS sent successfully");
        setOnProgress(false);
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        setVerified(true);
      })
      .catch((error) => {
        console.log("SMS not sent. Pls re-check your phone number");
        setActionStatus("SMS not sent. Pls re-check your phone number");
        setOnProgress(false);
      });
  }

  function resolveOTP() {
    
    const otp = userOTP;
    setOnProgress(true);
    window.confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      globalAuth.login(user);
      setActionStatus("User Signed in successfully");
      setOnProgress(false)
      // ...
    }).catch((error) => {
      console.log("Invalid Verification Code");
      setActionStatus("Invalid Verification Code");
      setOnProgress(false)
    });

    console.log(globalAuth.user);
    navigate("/home");

  }

  console.log("rerendered");

  return (
    <section className="min-h-screen bg-gradient-to-b to-teal-300 from-indigo-500 flex flex-col justify-center items-center">
      {!verified && (
        <div
          className={
            verified
              ? "flex flex-col p-4 h-40 justify-around items-center select-none"
              : "flex flex-col p-4 h-40 justify-around items-center"
          }
        >
          <label htmlFor="" className="flex items-center">
            <span className="font-bold text-lg">Enter Number:</span>
            <div className="border-b-4 border-blue-600 focus:outline-none active:outline-none">
              <select
                name=""
                id=""
                className="px-1 text-blue-600"
                defaultValue={"+91"}
                onChange={(e) => {
                  setCountrycode(e.target.value);
                }}
              >
                <option value={"+91"}>+91</option>
                <option value={"+81"}>+81</option>
                <option value={"+86"}>+86</option>
                <option value={"+92"}>+92</option>
              </select>
              <input
                type="tel"
                name=""
                id=""
                max={10}
                className="focus:outline-none"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                autoComplete="on"
              />
            </div>
          </label>

          <button
            className="p-2 border w-1/2 bg-blue-600 rounded-2xl hover:bg-blue-700 text-white flex justify-around items-center disabled:opacity-50 disabled:cursor-not-allowed"
            id="signinbtn"
            onClick={setUpRecaptcha}
            disabled={onProgress}
          >
            <span>Get OTP</span>
            {onProgress ? (
              <Rings
                height="40"
                width="40"
                color="#fff"
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
            ) : (
              <></>
            )}
          </button>
        </div>
      )}
      <div
        id="recaptcha-container"
        className={!verified ? "" : "hidden"}
      ></div>
      {verified && (
        <div className="flex flex-col p-4 h-40 justify-around items-center">
          <label htmlFor="" className="flex items-center">
            <span className="font-bold text-lg">Enter OTP:</span>
            <div className="border-b-4 border-blue-600 focus:outline-none active:outline-none">
              <input
                type="number"
                name=""
                id=""
                max={10}
                className="focus:outline-none"
                value={userOTP}
                onChange={(e) => {
                  setUserOTP(e.target.value);
                }}
                autoComplete="on"
              />
            </div>
          </label>

          <button
            className="p-2 border w-1/2 bg-blue-600 rounded-2xl hover:bg-blue-700 text-white flex justify-around items-center disabled:opacity-50 disabled:cursor-not-allowed"
            id="signinbtn"
            onClick={resolveOTP}
            disabled={onProgress}
          >
            <span>Verify OTP</span>
            {onProgress ? (
              <Rings
                height="40"
                width="40"
                color="#fff"
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
            ) : (
              <></>
            )}
          </button>
        </div>
      )}
      <div id="status">
            {actionStatus}
      </div>
    </section>
  );
};

export default LoginUsingNumber;
