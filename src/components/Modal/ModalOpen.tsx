import React from "react";
import {
  Modal,
  Typography,
  IconButton,
  Fade,
  Grid,
  Slide,
  InputAdornment,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import "./ModalOpen.css";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

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
                  <Typography sx={{ fontWeight: "bold" }}>
                    Payment Details
                  </Typography>
                  <FormControl variant="standard">
                    <InputLabel
                      htmlFor="component-simple"
                      style={{ color: "#392c00" }}
                    >
                      Name
                    </InputLabel>
                    <Input id="component-simple" />
                  </FormControl>
                  <FormControl variant="standard">
                    <InputLabel
                      htmlFor="visa-input"
                      style={{ color: "#392c00" }}
                    >
                      Card Number
                    </InputLabel>
                    <Input
                      id="number-input"
                      type="number"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <img
                            src="/assets/images/air-max.png"
                            alt="Visa"
                            style={{
                              width: 24,
                              height: 24,
                              objectFit: "contain",
                            }}
                          />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Grid xs={8} mr={2}>
                      <FormControl variant="standard">
                        <InputLabel
                          htmlFor="component-simple"
                          style={{ color: "#392c00" }}
                        >
                          Card Expiry
                        </InputLabel>
                        <Input id="component-simple" />
                      </FormControl>
                    </Grid>
                    <Grid xs={4}>
                      <FormControl variant="standard">
                        <InputLabel
                          htmlFor="cvv-input"
                          style={{ color: "#392c00" }}
                        >
                          CVV
                        </InputLabel>
                        <Input
                          id="cvv-input"
                          fullWidth
                          autoComplete="off"
                          type="password"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Typography sx={{color:"#392c00"}}>Payment Amount: US$ <strong>275</strong></Typography>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      size="large"
                      className="container_button"
                      variant="contained"
                    >
                      Pay
                    </Button>
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
