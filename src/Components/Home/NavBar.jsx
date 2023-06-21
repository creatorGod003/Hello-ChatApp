import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfigs/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserId } from "../../features/user/userLoginSlice";
import { updateuser } from "../../features/user/userSlice";

const NavBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  function toggleSidebar() {
    showSidebar ? setShowSidebar(false) : setShowSidebar(true);
  }

  const globalAuth = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Welcome");

  const loggedInUser = useSelector((state) => {
    return state.userSignIn.user;
  });
  const dispatch = useDispatch();

  async function getUserId() {
    console.log(loggedInUser);
    if (loggedInUser !== null) {
      const obj = JSON.parse(loggedInUser);
      console.log(obj.email);
      const docRef = doc(db, "users", obj.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserName(docSnap.data().username);
        dispatch(updateUserId(docSnap.data().username));
      } else {
        console.log("No such document!");
      }
    }
  }

  useEffect(() => {
    getUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser]);

  return (
    <>
      <nav
        id="header"
        className="w-full z-30 top-10 py-1 bg-white shadow-lg border-b border-blue-400 "
      >
        <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer md:hidden block"
            onClick={toggleSidebar}
          >
            <svg
              className="fill-current text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>

          <div
            className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
            id="menu"
          >
            <nav>
              <ul className="md:flex items-center justify-between text-base text-blue-600 pt-4 md:pt-0">
                <Link
                  to="home"
                  className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                >
                  Home
                </Link>
                <Link
                  to="chat"
                  className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                >
                  Chat
                </Link>
                <Link
                  to="about"
                  className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                >
                  About
                </Link>
              </ul>
            </nav>
          </div>

          {globalAuth.user === null ? (
            <div
              className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
              id="nav-content"
            >
              <div className="auth flex items-center w-full md:w-full">
                <Link
                  to="login"
                  className="bg-transparent text-gray-900 font-semibold  p-2 rounded border border-gray-400 mr-4 hover:bg-gray-100 hover:text-gray-700"
                >
                  Sign in
                </Link>
                <Link
                  to="signup"
                  className="bg-gradient-to-r from-blue-500 to-teal-500 font-semibold text-white  p-2 rounded  hover:bg-blue-500 hover:text-gray-100 border-black border-2"
                >
                  Sign up
                </Link>
              </div>
            </div>
          ) : (
            <div className="order-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white p-2 rounded">
              <Link to={`/user/${userName}`} className="text-black font-bold border-white p-2 border-r-2">
                {userName}
              </Link>
              <button
                  className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                  onClick={() => {
                    dispatch(updateuser(null));
                    dispatch(updateUserId(null));
                    dispatch(logout());
                    globalAuth.logout();
                    navigate("/home");
                  }}
                >
                  Sign Out
                </button>
            </div>
          )}
        </div>
      </nav>

      {showSidebar ? (
        <nav
          id="sidebar"
          className="w-[50vw] h-[75vh] bg-gradient-to-b from-blue-500 to-teal-500 absolute left-0 top-0 border text-white shadow-lg shadow-slate-400 rounded-br-lg"
        >
          <div className="relative flex justify-center m-5" id="menu">
            <ul className="flex flex-col">
              <Link
                to="home"
                className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                onClick={toggleSidebar}
              >
                Home
              </Link>
              <Link
                to="chat"
                className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                onClick={toggleSidebar}
              >
                Chat
              </Link>
              <Link
                to="about"
                className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                onClick={toggleSidebar}
              >
                About
              </Link>

              {globalAuth.user === null ? null : (
                <button
                  className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                  onClick={() => {
                    dispatch(updateuser(null));
                    dispatch(updateUserId(null));
                    dispatch(logout());
                    globalAuth.logout();
                    navigate("/home");
                    toggleSidebar();
                  }}
                >
                  Sign Out
                </button>
              )}
            </ul>

            <button
              className="text-2xl absolute top-0 right-0 text-black"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="animate-bounce w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default NavBar;
