import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import StyledButton from "../components/StyledButton";
import { useForm } from "react-hook-form";
import ForwardedTextInput from "../components/StyledTextfield";
import loginImage from "../assets/logo-round.png";
import { useLocation } from "react-router-dom";

function Newpassword() {
  const location = useLocation();
  const methods = useForm();
  const [password, setPassword] = useState("");
  const { handleSubmit, register, formState } = methods;
  const errors = formState?.errors;
  const handleLogin = handleSubmit((data) => {
    if (data?.newPassword === data?.confirmNewPassword) {
      setPassword(data?.confirmNewPassword);
      const updatedData = {
        oldPassword: data?.oldPassword,
        newPassword: password,
        email: location?.state?.email,
      };
      fetch(`http://localhost:8080/resetPassword`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.error("Error:", err));
    }
    console.log(data);
  });
  console.log(location?.state?.email,password, "20");
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
        sx={{ display: "flex", justifyContent: "center", borderRadius: "20px" }}
      >
        <Box
          className="md:block hidden"
          sx={{
            height: "570px",
            width: "380px",
            padding: "20px",
            borderRight: "1px solid lightgray",
          }}
        >
          <img
            className="w-full h-full object-contain rounded-l-2xl"
            src={loginImage}
            alt=""
          />
        </Box>
        <Box className="px-4 py-7 md:w-auto">
          <Typography variant="h4" className="text-center font-bold">
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit(handleLogin)} noValidate>
            <Box className="py-9 px-6 flex flex-col justify-center items-center gap-3">
              <ForwardedTextInput
                label="Old Password"
                type="password"
                error={errors?.oldPassword ? true : false}
                helperText={errors?.oldPassword?.message}
                placeholder="Old password"
                isRequired
                {...register("oldPassword", {
                  required: "oldPassword is Required",
                })}
              />
              <ForwardedTextInput
                label="New Password"
                type="password"
                error={errors?.newPassword ? true : false}
                helperText={errors?.newPassword?.message}
                placeholder="new password"
                isRequired
                {...register("newPassword", {
                  required: "newPassword is Required",
                })}
              />
              <ForwardedTextInput
                label="Confirm New Password"
                type="password"
                error={errors?.confirmNewPassword ? true : false}
                helperText={errors?.confirmNewPassword?.message}
                placeholder="confirm new password"
                isRequired
                {...register("confirmNewPassword", {
                  required: "confirmNewPassword is Required",
                })}
              />
              {/* <Typography color={"blue"} >Forgot password</Typography> */}
              <StyledButton
                sx={{ marginTop: "15px" }}
                type={"submit"}
                label={"reset password"}
                width={"100%"}
              />
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Newpassword;
