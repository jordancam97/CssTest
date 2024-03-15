import React from "react";
import {
  Modal,
  Typography,
  IconButton,
  Fade,
  Grid,
  Slide,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import "./ModalOpen.css";

const ModalOpen = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={() => {}}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
    >
      <Fade in={open} timeout={500}>
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
              width: 680,
              height: 500,
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
                color: "black",
              }}
            >
              <Close />
            </IconButton>

            <Grid container sx={{ width: "100%", height: "100%" }}>
              <Fade in={open} timeout={1200}>
                <Grid item xs={6} className="columnLeft">
                  <Grid className="columnLeft_content">
                    <img
                      className="columnLeft_contentImg"
                      src="/assets/images/air-max-shadow.png"
                      alt="Air Max Shadow"
                    />
                    <Grid className="columnLeft_contentText">
                      <span>Air Max Plus 3 IronMan</span>
                      <br />
                      <Grid sx={{ fontSize: 12, lineHeight: "14px" }}>
                        <span>
                          <strong>Size:</strong> 40
                        </span>
                        <br />
                        <span>
                          <strong>Ammount:</strong> 2
                        </span>
                        <br />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Fade>

              <Slide direction="right" in={true} timeout={500}>
                <Grid item xs={6} className="columnRight">
                  <div>
                    <h3 style={{ color: "white" }}>Column 2</h3>
                    <p style={{ color: "white" }}>Content for column 2</p>
                  </div>
                </Grid>
              </Slide>
            </Grid>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalOpen;
