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
  FormHelperText,
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
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  cardNumber: number;
}

const ModalOpen = ({ open, handleClose, selectedSize, quantity }) => {
  const totalAmount = quantity * 275;
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [transactionId, setTransactionId] = useState("");

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
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

  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("card");

  const handleCardNumberChange = (event) => {
    const inputCardNumber = event.target.value;
    setCardNumber(inputCardNumber);

    const cardRegex = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6/,
      dinersclub: /^3(?:0[0-5]|[68])/,
      maestro: /^(5018|5020|5038|6304|6759|676[1-3]|500)/,
    };

    for (const [type, regex] of Object.entries(cardRegex)) {
      if (regex.test(inputCardNumber)) {
        if (type === "mastercard") {
          if (
            /^(5018|5020|5038|6304|6759|676[1-3]|500)/.test(inputCardNumber)
          ) {
            setCardType("maestro");
          } else {
            setCardType("mastercard");
          }
        } else {
          setCardType(type);
        }
        return;
      }
    }
    setCardType("card");
  };

  console.log("cardType", cardType);

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
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="columnRight_form"
                      >
                        <TextField
                          label="Nombre"
                          variant="standard"
                          {...register("name", {
                            required: "El nombre es requerido*",
                            pattern: {
                              value: /^(?!.*\s{2})[a-zA-Z\s]*$/,
                              message: "Formato de nombre invalido",
                            },
                            minLength: {
                              value: 3,
                              message:
                                "El nombre debe tener al menos 3 letras.",
                            },
                          })}
                          error={!!errors.name}
                          helperText={errors.name && errors.name.message}
                        />

                        <FormControl variant="standard">
                          <InputLabel
                            htmlFor="visa-input"
                            style={{ color: errors.cardNumber? "#d32f2f" : "#392c00" }}
                          >
                            Card Number
                          </InputLabel>
                          <Input
                            id="number-input"
                            type="text"
                            inputProps={{
                              inputMode: "numeric",
                              maxLength: 16, 
                              ...register("cardNumber", {
                                required: "Card number is required*",
                                pattern: {
                                  value: /^[0-9]+$/,
                                  message: "Solo se aceptan numeros",
                                },
                                maxLength: {
                                  value: 16,
                                  message:
                                    "Card number must be exactly 16 digits",
                                },
                                minLength: {
                                  value: 16,
                                  message:
                                    "Card number must be exactly 16 digits",
                                },
                              }),
                            }}
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            endAdornment={
                              <InputAdornment position="end">
                                <img
                                  src={`/assets/images/${cardType}.png`}
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

                          {errors.cardNumber && (
                            <FormHelperText
                              style={{ color: "#d32f2f" }}
                              id="standard-weight-helper-text"
                            >
                              {errors.cardNumber.message}
                            </FormHelperText>
                          )}
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
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            size="large"
                            className="container_button"
                            variant="contained"
                            disabled={transactionInProgress}
                            type="submit"
                          >
                            {transactionInProgress ? "Processing..." : "Pay"}
                          </Button>
                          {transactionInProgress ? <LinearProgress /> : <></>}
                        </div>
                      </form>
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
