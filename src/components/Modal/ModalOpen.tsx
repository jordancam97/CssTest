import React, { useEffect, useState } from "react";
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
import { Close, ArrowBack } from "@mui/icons-material";

import "./ModalOpen.css";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";

const ModalOpen = ({ open, handleClose, selectedSize, quantity }) => {
  const totalAmount = quantity * 275;
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  useEffect(() => {
    setTransactionSuccess(false);
  }, [])
  

  const handlePay = () => {
    // Espacio logica de pago


    setTransactionInProgress(true); // Indica que la transacción está en curso
    const transactionSuccess = true; // Cambiar a false para simular una transacción fallida
    setTimeout(() => {
      if (transactionSuccess) {
        setTransactionSuccess(true);
        setTransactionInProgress(false); 
      } else {
        setTransactionFailed(true);
        setTransactionInProgress(false); 
      }
    }, 2000);
  };

  const handleRetry = () => {
    setTransactionFailed(false);
  };

  const handleModalClose = () => {
    handleClose();
    setTimeout(() => {
      setTransactionSuccess(false);
    }, 500);
    
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
              onClick={transactionFailed ? handleRetry : handleModalClose}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "black",
              }}
            >
              {transactionFailed ? <ArrowBack /> : <Close />}
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
                          <strong>Size:</strong> {selectedSize}
                        </span>
                        <br />
                        <span>
                          <strong>Quantity:</strong> {quantity}
                        </span>
                        <br />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Fade>

              <Slide direction="right" in={true} timeout={500}>
                <Grid item xs={6} className="columnRight">
                  {transactionSuccess && (
                    <Typography variant="h6" gutterBottom>
                      ¡Pago exitoso!
                    </Typography>
                  )}
                  {transactionFailed && (
                    <Typography variant="h6" gutterBottom>
                      ¡Pago fallido!
                    </Typography>
                  )}
                  {!transactionSuccess && !transactionFailed && (
                    <>
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
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          }}
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
                      <Typography sx={{ color: "#392c00" }}>
                        Payment Amount: US$ <strong>{totalAmount}</strong>
                      </Typography>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          size="large"
                          className="container_button"
                          variant="contained"
                          onClick={handlePay}
                          disabled={transactionInProgress}
                        >
                          {transactionInProgress ? "Processing..." : "Pay"}
                          
                        </Button>
                        {transactionInProgress ? <LinearProgress /> : <></>}
                      </div>
                    </>
                  )}
                  {transactionInProgress ? <LinearProgress /> : <></>}
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
