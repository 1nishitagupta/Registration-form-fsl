import React, { ChangeEventHandler, useState } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ForwardedTextInput = React.forwardRef(function Textinput(
  {
    label,
    id,
    name,
    value,
    type,
    placeholder,
    onChange,
    isRequired,
    InputProps,
    disabled,
    inputProps,
    multiline,
    onInput,
    error,
    helperText,
    width,
    sx,
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const renderPasswordToggle = () => {
    if (type === "password") {
      return (
        <InputAdornment position="end">
          <IconButton onClick={toggleShowPassword} tabIndex={-1}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "10px",
        width: width ? width : "100%",
      }}
    >
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: "24px",
            fontWeight: "500",
            letterSpacing: "0.15px",
          }}
        >
          {label} {<sup style={{ color: "#F44" }}>{isRequired ? "*" : ""}</sup>}
        </label>
      )}
      <TextField
        type={showPassword ? "text" : type}
        name={name}
        value={value}
        multiline={multiline}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        inputProps={inputProps}
        onInput={onInput}
        size="medium"
        sx={{
          ...sx,
          fontWeight: "400",
          fontSize: "16px",
          width: width ? width : "100%",
        }}
        InputProps={{
          ...InputProps,
          endAdornment: renderPasswordToggle(),
        }}
        inputRef={ref}
        error={error}
        helperText={helperText}
        className="rounded"
      />
    </Box>
  );
});

ForwardedTextInput.displayName = "ForwardedTextInput";

export default ForwardedTextInput;
// import { Box, TextField, Typography } from "@mui/material";

// import { useForm } from "react-hook-form";

// const StyleTextfield = ({
//   label,
//   name,
//   type,
//   pattern,
//   placeholder,
//   onChange,
//   value,
//   register,
//   isRequired,
//   errors,
//   ref,
// }) => {
//   // const { formState } = useForm();

//   // const { errors } = formState;

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "flex-start",
//         alignItems: "center",
//         gap: "10px",
//       }}
//     >
//       <Typography>{label}</Typography>
//       <TextField
//         value={value}
//         type={type}
//         size="medium"
//         fullWidth
//         inputRef={ref}
//         onChange={onChange}
//         name={name}
//         placeholder={placeholder}
//         autoComplete="off"
//         {...register(name, {
//           required: isRequired ? `${name} is required` : false,
//           pattern: {
//             value: pattern,
//             message: `Invalid ${name} format`,
//           },
//         })}
//       />
//       {errors && errors[name] && (
//         <Typography color="error">{errors[name].message}</Typography>
//       )}
//     </Box>
//   );
// };

// export default StyleTextfield;
