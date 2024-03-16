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
import TextField from "@mui/material/TextField";

import "./ModalOpen.css";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";


const ModalOpen = ({ open, handleClose, selectedSize, quantity }) => {
  const totalAmount = quantity * 275;
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [nameValid, setNameValid] = useState(false); // Estado para validar el nombre

  useEffect(() => {
    setTransactionSuccess(false);
  }, []);

  const generateTransactionId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let transactionId = "";
    for (let i = 0; i < 8; i++) {
      transactionId += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return transactionId;
  };

  const handlePay = () => {
    if (!nameValid) return; // No permite continuar si el nombre no es válido
    // Espacio lógica de pago

    setTransactionInProgress(true); // Indica que la transacción está en curso
    const transactionSuccess = true; // Cambiar a false para simular una transacción fallida
    setTimeout(() => {
      if (transactionSuccess) {
        setTransactionId(generateTransactionId());
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

  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Expresión regular para aceptar solo letras (mayúsculas y minúsculas) y espacios
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (onlyLettersRegex.test(inputValue) || inputValue === "") {
      setValue(inputValue);
    }
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
                    <Fade in={true} timeout={800}>
                      <Grid className="columnRight_transaction">
                        <Typography variant="h6" gutterBottom>
                          Succesful transaction!
                        </Typography>
                        <TaskAltRoundedIcon
                          color="success"
                          sx={{ fontSize: 80 }}
                          className="columnRight_iconSuccesful"
                        />
                        <Typography>
                          <strong>Transaction ID:</strong> {transactionId}
                        </Typography>
                        <Typography>
                          Thank you for your purchase, now you can visit our
                          nearest stores and claim your order with the
                          transaction id.
                        </Typography>
                      </Grid>
                    </Fade>
                  )}
                  {transactionFailed && (
                    <Fade in={true} timeout={800}>
                      <Grid className="columnRight_transaction">
                        <Typography variant="h6" gutterBottom color="error">
                          Transaction declined!
                        </Typography>
                        <ErrorOutlineRoundedIcon
                          color="error"
                          sx={{ fontSize: 80 }}
                          className="columnRight_iconDeclined"
                        />
                        <Typography>
                          We're sorry, the transaction has failed.
                        </Typography>
                        <Typography>
                          Please try again later or contact customer service for
                          help.
                        </Typography>
                      </Grid>
                    </Fade>
                  )}
                  {!transactionSuccess && !transactionFailed && (
                    <>
                      <Typography variant="h6" gutterBottom>
                        Payment Details
                      </Typography>
                      <TextField
                        id="standard-basic"
                        label="Name"
                        variant="standard"
                        value={value}
                        onChange={handleChange}
                      />
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
