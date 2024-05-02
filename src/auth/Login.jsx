import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import StyledButton from "../components/StyledButton";
import { useForm } from "react-hook-form";
import ForwardedTextInput from "../components/StyledTextfield";
import loginImage from "../assets/logo-round.png";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const methods = useForm();
  const Navigate = useNavigate();
  const { handleSubmit, register, formState } = methods;
  const urlSearchParams = new URLSearchParams(window.location.search);
  const hashvalue = urlSearchParams.get("hash");
  const email = urlSearchParams.get("email");
  // const email = "jainsuhani35@gmail.com";
  console.log(hashvalue, email, "25");

  const errors = formState?.errors;
  const handleLogin = handleSubmit((data) => {
    fetch(`http://localhost:8080/student/studentLogin`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Navigate("/resetPassword", { state: { email: data?.email } });
        }
      })
      .catch((err) => console.error("Error:", err));
  });
  useEffect(() => {
    fetch(`http://localhost:8080/student/getHashValue?email=${email}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (hashvalue !== data?.hashvalue) {
          console.log("not matched");
          Navigate("/not-found");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        className="md:border-solid border-2 border-gray-300 border-none"
        sx={{ display: "flex", borderRadius: "20px" }}
      >
        <Box
          className="md:block hidden"
          sx={{
            height: "500px",
            width: "400px",
            padding: "20px",
            borderRight: "1px solid lightgray",
          }}
        >
          <img
            className="w-full h-full object-contain  rounded-l-2xl"
            src={loginImage}
            alt=""
          />
        </Box>
        <Box className="px-4 py-7 md:w-auto">
          <Typography variant="h4" className="text-center font-bold ">
            Login
          </Typography>
          <form onSubmit={handleSubmit(handleLogin)} noValidate>
            <Box className="py-9 px-6 flex flex-col justify-center items-center gap-3">
              <ForwardedTextInput
                label="Email"
                type="email"
                error={errors?.email ? true : false}
                helperText={errors?.email?.message}
                placeholder="email"
                isRequired
                {...register("email", {
                  required: "email is Required",
                })}
              />
              <ForwardedTextInput
                label="Password"
                type="password"
                error={errors?.password ? true : false}
                helperText={errors?.password?.message}
                placeholder="password"
                isRequired
                {...register("password", {
                  required: "password is Required",
                })}
              />
              <Link to={"/forgotPassword"}>
                {" "}
                <Typography color={"blue"}>Forgot password</Typography>
              </Link>
              <StyledButton
                sx={{ marginTop: "15px" }}
                type={"submit"}
                label={"Submit"}
                width={"100%"}
              />
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
