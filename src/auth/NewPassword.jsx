import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import StyledButton from '../components/StyledButton'
import { useForm } from 'react-hook-form';
import ForwardedTextInput from '../components/StyledTextfield';
import loginImage from "../assets/logo-round.png";
function Newpassword() {
    const methods = useForm();
    const { handleSubmit, register, formState } =
    methods;
  const errors = formState?.errors;
    const handleLogin = handleSubmit((data)=>{
        console.log(data)
    })
  return (
    <Box sx={{height:"100vh", display:"flex",alignItems:"center",justifyContent:"center"}}>
    <Box className="md:border-solid border-2 border-gray-300 border-none" sx={{display:"flex",justifyContent:"center",borderRadius:"20px"}}>
        <Box className='md:block hidden' sx={{height:"570px",width:"380px",padding:"20px",borderRight:"1px solid lightgray"}}>
        <img className='w-full h-full object-contain rounded-l-2xl' src={loginImage} alt="" />
        </Box>
   <Box className="px-4 py-7 md:w-auto">
    <Typography variant='h4' className='text-center font-bold'>
Reset Password
    </Typography>
    <form onSubmit={handleSubmit(handleLogin)} noValidate>
    <Box  className="py-9 px-6 flex flex-col justify-center items-center gap-3">
 
    <ForwardedTextInput
                label="Old Password"
                type="password"
                error={errors?.email ? true : false}
                helperText={errors?.email?.message}
                placeholder="Old password"
                isRequired
                {...register("email", {
                  required: "email is Required",
                })}
              /> 
               <ForwardedTextInput
                label="New Password"
                type="password"
                error={errors?.password ? true : false}
                helperText={errors?.password?.message}
                placeholder="new password"
                isRequired
                {...register("password", {
                  required: "password is Required",
                })}
              /> 
               <ForwardedTextInput
                label="Confirm New Password"
                type="password"
                error={errors?.password ? true : false}
                helperText={errors?.password?.message}
                placeholder="confirm new password"
                isRequired
                {...register("password", {
                  required: "password is Required",
                })}
              />
              {/* <Typography color={"blue"} >Forgot password</Typography> */}
              <StyledButton sx={{marginTop:"15px"}} type={"submit"} label={"reset password"} width={"100%"} />
    </Box>

    </form>
   </Box>
   </Box>
   </Box>
  )
}

export default Newpassword