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
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface FormData {
  name: string;
  cardNumber: number;
  cvv: number | null;
  expiry: {
    month: string;
    year: string;
  };
}

const ModalOpen = ({ open, handleClose, selectedSize, quantity }) => {
  const totalAmount = quantity * 275;
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("card");
  const [isInputLabelVisible, setIsInputLabelVisible] = useState(false);

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
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    clearErrors,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    setTransactionInProgress(true); // Indica que la transacción está en curso
    const transactionSuccess = false; // Cambiar a false para simular una transacción fallida
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
      setIsInputLabelVisible(false);
      reset();
    }, 100);
  };

  const handleCardNumberChange = (event) => {
    const inputCardNumber = event.target.value;
    setCardNumber(inputCardNumber);

    const cardRegex = {
      visa: /^4/,
      mastercard: /^5[1-9]/,
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

  useEffect(() => {
    setValue("cvv", null);
    clearErrors("cvv");
  }, [watch("cardNumber")]);

  const isMonthValid = (value: string) => {
    const monthNumber = parseInt(value);
    return !isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12;
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear() % 100;

  const handleInputFocus = () => {
    setIsInputLabelVisible(true);
  };

  const handleInputBlur = () => {
    if (!watch("expiry.month") && !watch("expiry.year")) {
      setIsInputLabelVisible(false);
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
                          Please try again later. If the problem persists, we
                          recommend that you contact your card-issuing bank.
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
                            required: "Name is required*",
                            pattern: {
                              value: /^(?!.*\s{2})[a-zA-Z\u00C0-\u017F\s']*$/,
                              message: "Invalid name format",
                            },
                            minLength: {
                              value: 3,
                              message: "Name must be at least 3 letters",
                            },
                          })}
                          error={!!errors.name}
                          helperText={errors.name && errors.name.message}
                        />

                        <FormControl variant="standard">
                          <InputLabel
                            htmlFor="visa-input"
                            style={{ color: errors.cardNumber && "#d32f2f" }}
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
                                  message: "Card number entered is incorrect",
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
                                  alt={`${cardType} logo`}
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
                          <Grid xs={8} mr={2} mt={"-6px"}>
                            <InputLabel
                              htmlFor="card expiry"
                              sx={{
                                color: errors.expiry && "#d32f2f",
                                visibility:
                                  isInputLabelVisible || errors.expiry
                                    ? "visible"
                                    : "hidden",
                              }}
                            >
                              Card expiry
                            </InputLabel>
                            <Grid
                              xs={7}
                              sx={{ display: "flex", flexDirection: "row" }}
                            >
                              <Controller
                                name="expiry.month"
                                control={control}
                                defaultValue=""
                                rules={{
                                  required: "Month is required",
                                  validate: {
                                    validMonth: (value) =>
                                      isMonthValid(value) || "Invalid month",
                                    futureMonth: (value) =>
                                      parseInt(value) > currentMonth ||
                                      "Expiry month should be in the future",
                                  },
                                  minLength: 2,
                                  maxLength: 2,
                                }}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    variant="standard"
                                    fullWidth
                                    autoComplete="off"
                                    inputProps={{
                                      maxLength: 2,
                                      style: { textAlign: "center" },
                                    }}
                                    placeholder="MM"
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                  />
                                )}
                              />
                              <Typography>/</Typography>
                              <Controller
                                name="expiry.year"
                                control={control}
                                defaultValue=""
                                rules={{
                                  required: "Year is required",
                                  pattern: {
                                    value: /^[0-9]*$/,
                                    message: "Invalid year",
                                  },
                                  minLength: 2,
                                  maxLength: 2,
                                  min: {
                                    value: currentYear,
                                    message: `Year must be ${currentYear} or later`,
                                  },
                                }}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    variant="standard"
                                    fullWidth
                                    autoComplete="off"
                                    inputProps={{
                                      maxLength: 2,
                                      min: currentYear,
                                      style: { textAlign: "center" },
                                    }}
                                    placeholder="YY"
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                  />
                                )}
                              />
                            </Grid>
                            {errors.expiry && (
                              <FormHelperText
                                style={{ color: "#d32f2f" }}
                                id="standard-weight-helper-text"
                              >
                                Invalid card expiration
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid xs={4}>
                            <TextField
                              label="CVV"
                              variant="standard"
                              fullWidth
                              autoComplete="new-password"
                              type="password"
                              inputProps={{
                                inputMode: "numeric",
                                maxLength: cardType === "amex" ? 4 : 3,
                                ...register("cvv", {
                                  required: "Required*",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Invalid",
                                  },
                                  maxLength: {
                                    value: cardType === "amex" ? 4 : 3,
                                    message: "Invalid Max",
                                  },
                                  minLength: {
                                    value: cardType === "amex" ? 4 : 3,
                                    message: "Invalid Min",
                                  },
                                }),
                              }}
                              error={!!errors.cvv}
                              helperText={errors.cvv && errors.cvv.message}
                            />
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
