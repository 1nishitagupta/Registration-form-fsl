import { Button } from "@mui/material";
import React from "react";

const StyledButton = ({ label, onClick, type ,width}) => {
  return (
    <Button
      sx={{
        backgroundColor: "#f16b3b",
        color: "white",
        padding: "15px 10px",
        fontSize: "16px",
        borderRadius: "10px",
        fontWeight: "700",
        width:{width},
        "&:hover": {
          backgroundColor: "#f16b3b",
          color: "white",
        },
      }}
      type={type}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default StyledButton;
