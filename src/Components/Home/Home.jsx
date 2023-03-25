import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
const Home = () => {
  return (
    <div className="">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Home;
