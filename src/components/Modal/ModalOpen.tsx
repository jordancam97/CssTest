import React from "react";
import { Modal, Typography, IconButton, Fade } from "@mui/material";
import { Close } from "@mui/icons-material";

const ModalOpen = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={() => {}}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: 500,
              height: 500,
              backgroundColor: "red",
              padding: 20,
              position: "relative",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "white",
              }}
            >
              <Close />
            </IconButton>
            <Typography variant="h6" id="modal-title">
              Mi Modal
            </Typography>
            <Typography variant="body1" id="simple-modal-description">
              Contenido de mi modal...
            </Typography>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalOpen;
