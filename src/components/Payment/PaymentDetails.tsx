import React, { useEffect, useState } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  Grid,
  InputAdornment,
  Button,
  LinearProgress,
  Fade,
  IconButton,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Close, ArrowBack } from "@mui/icons-material";
import { simulatePayment } from "./SimulatePayment.tsx";
import {
  setTransactionSuccess,
  setTransactionFailed,
  setTransactionId,
  setSelectedSize,
  setQuantity,
  selectState,
  selectPayment,
} from "./Actions/store.js";
import { useDispatch, useSelector } from "react-redux";
interface FormData {
  name: string;
  cardNumber: number;
  cvv: number | null;
  expiry: {
    month: string;
    year: string;
  };
}

const PaymentDetails = ({ handleClose }) => {
   const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("card");
  const [isInputLabelVisible, setIsInputLabelVisible] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false)

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

  const dispatch = useDispatch();
  const {
    transactionSuccess,
    transactionFailed,
    transactionId,
  } = useSelector(selectPayment);

  const {
    selectedSize,
    quantity
  } = useSelector(selectState);

  const totalAmount = quantity * 275;

  useEffect(() => {
    const storedData = localStorage.getItem("paymentData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      dispatch(setTransactionSuccess(parsedData.transactionSuccess));
      dispatch(setTransactionFailed(parsedData.transactionFailed));
      dispatch(setTransactionId(parsedData.transactionId));
    }
  }, [dispatch]);

  useEffect(() => {
    const dataToStore = JSON.stringify({
      transactionSuccess,
      transactionFailed,
      transactionId,
    });
    localStorage.setItem("paymentData", dataToStore);
  }, [
    transactionSuccess,
    transactionFailed,
    transactionId,
  ]);

  const onSubmit = (data) => {
    setTransactionInProgress(true);

    simulatePayment(data)
      .then((response) => {
        console.log(response);
        const newTransactionId = generateTransactionId();
        dispatch(setTransactionId(newTransactionId));
        dispatch(setTransactionSuccess(true));
        setTransactionInProgress(false);
        localStorage.removeItem("paymentData");
        localStorage.setItem("transactionId", newTransactionId);
      })
      .catch((error) => {
        console.error(error);
        dispatch(setTransactionFailed(true));
        setTransactionInProgress(false);
      });
  };

  const handleRetry = () => {
    dispatch(setTransactionFailed(false));
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

  const handleModalClose = () => {
    handleClose();
    setTimeout(() => {
      dispatch(setTransactionSuccess(false));
      setIsInputLabelVisible(false);
      dispatch(setSelectedSize(null));
      dispatch(setQuantity(1));
      localStorage.removeItem("allState");
      reset();
    }, 100);
  };


  return (
    <>
      <Fade in={true} timeout={3000}>
        <IconButton
          aria-label="close"
          onClick={transactionFailed ? handleRetry : handleModalClose}
          sx={{
            position: "absolute",
            top: { xs: "38px", sm: "30px", md: "10px" },
            right: { xs: "38px", sm: "30px", md: "10px" },
            color: "black",
          }}
        >
          {transactionFailed ? <ArrowBack /> : <Close />}
        </IconButton>
      </Fade>
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
              Thank you for your purchase, now you can visit our nearest stores
              and claim your order with the transaction id.
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
            <Typography>We're sorry, the transaction has failed.</Typography>
            <Typography>
              Please try again later. If the problem persists, we recommend that
              you contact your card-issuing bank.
            </Typography>
          </Grid>
        </Fade>
      )}
      {!transactionSuccess && !transactionFailed && (
        <>
          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="columnRight_form">
            <Typography sx={{display:{xs:"flex", sm:"none"}}}>Air Max Plus 3 IronMan</Typography>
            <Grid sx={{ display:{xs:"flex", sm:"none"}, flexDirection:"column" }}>
              <Typography sx={{fontSize: 12}}>
                <strong>Size:</strong> {selectedSize}
              </Typography>
              <Typography sx={{fontSize: 12}}>
                <strong>Quantity:</strong> {quantity}
              </Typography>
            </Grid>
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
                  maxLength: cardType === "amex" ? 15 : 16,
                  ...register("cardNumber", {
                    required: "Card number is required*",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Card number entered is incorrect",
                    },
                    maxLength: {
                      value: cardType === "amex" ? 15 : 16,
                      message: "Card number must be exactly 16 digits",
                    },
                    minLength: {
                      value: cardType === "amex" ? 15 : 16,
                      message: "Card number must be exactly 16 digits",
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
            <Grid sx={{ display: "flex", flexDirection: "row", marginTop:"6px" }}>
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
                <Grid xs={7} sx={{ display: "flex", flexDirection: "row" }}>
                  <Controller
                    name="expiry.month"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Month is required",
                      validate: {
                        validMonth: (value) => {
                          const monthNumber = parseInt(value);
                          const currentYearLastTwoDigits = currentYear % 100;
                  
                          if (isNaN(monthNumber)) return false; 
                  
                          if (parseInt(watch("expiry.year")) === currentYearLastTwoDigits) {
                            return monthNumber > currentMonth;
                          } else {
                            return true;
                          }
                        },
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
                  type="text"
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
            <Typography sx={{ color: "#392c00", marginTop:"15px"}}>
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
            </div>
            {transactionInProgress && <LinearProgress />}
          </form>
        </>
      )}
      {transactionInProgress && <LinearProgress />}
    </>
  );
};

export default PaymentDetails;
