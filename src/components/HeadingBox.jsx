import { Box, Icon, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const HeadingBox = ({ heading, onClick, prevIcon }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, .03)",
        borderBottom: "1px solid rgba(0,0,0,.125)",
        padding: "0.75rem 1.25rem ",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {prevIcon && (
        <Box onClick={onClick} sx={{ cursor: "pointer" }}>
          {" "}
          <ArrowBackIcon fontSize="large" />{" "}
        </Box>
      )}

      <Typography variant="h4">{heading}</Typography>
    </Box>
  );
};

export default HeadingBox;
