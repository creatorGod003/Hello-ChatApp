import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

import app from "../../FirebaseConfigs/FirebaseConfig";
import { Rings } from "react-loader-spinner";

const Login = () => {
  const [countrycode, setCountrycode] = useState("+91");
  const [number, setNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const auth = getAuth(app);
  const [onProgress, setOnProgress] = useState(false);
  const [userOTP, setUserOTP] = useState("");
  const [verified, setVerified] = useState("");
  const [actionStatus, setActionStatus] = useState("");

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
    window.confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      setActionStatus("User Signed in successfully");

      // ...
    }).catch((error) => {
      console.log("Invalid Verification Code");
      setActionStatus("Invalid Verification Code");
    });


  }

  console.log("rerendered");

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center">
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
            <div className="border-b-4 border-purple-600 focus:outline-none active:outline-none">
              <select
                name=""
                id=""
                className="px-1 text-purple-600"
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
            className="p-2 border w-1/2 bg-purple-600 rounded-2xl hover:bg-purple-700 text-white flex justify-around items-center disabled:opacity-50 disabled:cursor-not-allowed"
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
        className={onProgress ? "" : "hidden"}
      ></div>
      {verified && (
        <div className="flex flex-col p-4 h-40 justify-around items-center">
          <label htmlFor="" className="flex items-center">
            <span className="font-bold text-lg">Enter OTP:</span>
            <div className="border-b-4 border-purple-600 focus:outline-none active:outline-none">
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
            className="p-2 border w-1/2 bg-purple-600 rounded-2xl hover:bg-purple-700 text-white flex justify-around items-center disabled:opacity-50 disabled:cursor-not-allowed"
            id="signinbtn"
            onClick={resolveOTP}
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

export { Login };
