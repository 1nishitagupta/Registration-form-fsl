import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const MainOutlet = () => {
  return (
    <>
      <Header />

     
        <Outlet />
    
    </>
  );
};

export default MainOutlet;
