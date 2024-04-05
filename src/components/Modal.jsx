import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, IconButton } from "@mui/material";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function ConfirmationModal({
  open,
  setOpen,
  setConfirmation,
  confirmation,
}) {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event) => {
    setConfirmation(!confirmation);
  };
  useEffect(() => {
    console.log(confirmation);
    if (confirmation) {
      setOpen(false);
    }
  }, [confirmation]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            className={
              "flex justify-between items-center border-b-2 border-[#00000094]"
            }
          >
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Term & Conditions
            </Typography>
            <IconButton onClick={handleClose}>
              {" "}
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
          <Box className="py-2 px-4">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              You agree to the following:
            </Typography>
            <ul style={{ listStyleType: "disc" }}>
              <li> You have understood the course content.</li>
              <li>You have understood the course duration.</li>
              <li>
                You have cleared all your doubts regarding the course, the
                content and the duration and have no problem with it.
              </li>
              <li>Fees once paid is not refundable.</li>
            </ul>
          </Box>

          <Box className="flex justify-start items-center">
            <Checkbox
              checked={confirmation}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography fontWeight={"bold"}>I agree</Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
