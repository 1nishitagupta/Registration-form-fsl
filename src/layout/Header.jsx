import { Box } from "@mui/material";
import { useState } from "react";
import LogoFSL from "../assets/logo-round.png";

function Header() {
  const [toggle, setToggle] = useState(false);

  function onToggleMenu(e) {
    e.preventDefault();
    setToggle(!toggle);
    console.log(e);
  }
  console.log(toggle, "12");

  return (
    <header>
      <Box
        className="md:w-full  px-8"
        sx={{
          background:
            "linear-gradient(45deg,rgba(242,113,68,1) 63%, rgba(38,145,191,1) 63% )",
          width: "100%",
        }}
      >
        <Box className="px-8">
          <Box
            className="md:text-sm text-[13px]  px-9  text-white "
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <p className="mb-0 pr-5">
              <i className="fa-solid fa-phone"></i>
              +91-8824453320
            </p>
            <p className="md:text-sm test-xs mb-0 pr-6">
              <i className="fa-solid fa-phone"></i>
              +91-9024881021
            </p>
          </Box>
        </Box>
      </Box>

      <nav className="bg-white">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            borderBottom: "1px solid",
          }}
        >
          <Box
            sx={{
              height: "90px",
              width: "90px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a href="#">
              <img className="h-full w-full" src={LogoFSL} alt="" />
            </a>
          </Box>
          <Box
            className="md:static absolute bg-white md:min-h-fit min-h-[50vh]  right-[10%] md:w-auto w-full flex justify-end items-center  px-5 py-2"
            sx={{
              top: toggle ? "25%" : "-100%",
              transition: "0.9s ease-in",
              zIndex: toggle ? "-100" : "1",
            }}
          >
            <ul className="flex md:flex-row flex-col items-center text-[#f47144] text-xl font-light md:gap-7 gap-8">
              <li className="">
                <a className="hover:text-[#f47144]" href="#">
                  Home
                </a>
              </li>
              <li className="">
                <a className="hover:text-[#f47144]" href="#">
                  Courses
                </a>
              </li>
              <li className="">
                <a className="hover:text-[#f47144]" href="#">
                  About
                </a>
              </li>
              <li className="">
                <a className="hover:text-[#f47144]" href="#">
                  Blog
                </a>
              </li>
              <li className="">
                <a className="hover:text-[#f47144]" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </Box>
          <Box className="flex items-center gap-6">
            <button className="bg-[#f47144] py-1.5 px-3 text-white rounded-md hover:bg-[#2691bf] transition">
              <a className="font-bold text-white hover:text-white" href="#">
                Login/Register
              </a>
            </button>
            <i
              onClick={onToggleMenu}
              className="fa-solid fa-bars text-2xl cursor-pointer md:hidden"
            ></i>
            {/* <i onClick={CloseMenu}  className="fa-solid fa-xmark text-2xl cursor-pointer md:hidden"></i> */}
          </Box>
        </Box>
      </nav>
    </header>
  );
}

export default Header;
