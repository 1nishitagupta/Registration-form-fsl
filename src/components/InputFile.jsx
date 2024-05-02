import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const InputFile = () => {
  const [aadharCardFront, setAadharCardFront] = useState(null);
  const [aadharCardBack, setAadharCardBack] = useState(null);
  const [fileUrlFront, setFileUrlFront] = useState("");
  const [fileUrlBack, setFileUrlBack] = useState("");
  const baseUrl = "http://localhost:5173/";
  const uploadEndpoint = "http://localhost:8080/upload";
  console.log(fileUrlFront, fileUrlBack, "11");

  const handleFileChange = (e) => {
    setAadharCardFront(e.target.files[0]);
    setFileUrlFront(URL.createObjectURL(e.target.files[0]));
  };

  const handleFileTwoChange = (e) => {
    setAadharCardBack(e.target.files[0]);
    setFileUrlBack(URL.createObjectURL(e.target.files[0]));
  };

  const uploadFiles = () => {
    if (aadharCardFront && aadharCardBack) {
      const formData = new FormData();
      formData.append("file", aadharCardFront);
      formData.append("file", aadharCardBack);

      fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (Array.isArray(data.filePaths)) {
            setFileUrlFront(baseUrl + data.filePaths[0].replace(/\\/g, "/"));
            setFileUrlBack(baseUrl + data.filePaths[1].replace(/\\/g, "/"));
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("fill all the fields");
    }
  };
  console.log(fileUrlFront, fileUrlBack, "48");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "10px",
        width: "100%",
        marginBottom: "10px",
      }}
    >
      <label
        style={{
          fontSize: "24px",
          fontWeight: "500",
          letterSpacing: "0.15px",
        }}
      >
        AadharCard {<sup style={{ color: "#F44" }}>*</sup>}
      </label>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "30px" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <TextField type="file" onChange={handleFileChange} />
          {fileUrlFront && (
            <img src={fileUrlFront} width={"300px"} height={"auto"} alt="" />
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <TextField type="file" onChange={handleFileTwoChange} />
          {fileUrlBack && (
            <img src={fileUrlBack} width={"300px"} height={"auto"} alt="" />
          )}
        </Box>
        {/* {aadharCardFront === null && aadharCardBack === null 
          <Typography color={"red"}> Fill the fields</Typography>
        } */}
        <Button onClick={uploadFiles}>Upload</Button>
      </Box>
    </Box>
  );
};

export default InputFile;
