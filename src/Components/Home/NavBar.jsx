import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  function toggleSidebar() {
      showSidebar?setShowSidebar(false):setShowSidebar(true)
  }
  
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

          <div
            className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
            id="nav-content"
          >
            <div className="auth flex items-center w-full md:w-full">
              <Link
                to="login"
                className="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700"
              >
                Sign in
              </Link>
              <Link
                to="signup"
                className="bg-blue-600 text-gray-200  p-2 rounded  hover:bg-blue-500 hover:text-gray-100"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {showSidebar? <nav id="sidebar" className="w-[50vw] h-screen absolute left-0 bg-white top-0 border">
        <div
          className="relative flex justify-center m-5"
          id="menu"
        >
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
            </ul>
            
         <button className="text-2xl absolute top-0 right-0 text-blue-700  " onClick={toggleSidebar}>X</button>
        </div>
      </nav> : null}
      
    </>
  );
};

export default NavBar;
