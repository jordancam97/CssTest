import { configureStore, createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    transactionSuccess: false,
    transactionFailed: false,
    transactionInProgress: false,
    transactionId: "",
  },
  reducers: {
    setTransactionSuccess: (state, action) => {
      state.transactionSuccess = action.payload;
    },
    setTransactionFailed: (state, action) => {
      state.transactionFailed = action.payload;
    },
    setTransactionInProgress: (state, action) => {
      state.transactionInProgress = action.payload;
    },
    setTransactionId: (state, action) => {
      state.transactionId = action.payload;
    },
  },
});

export const {
  setTransactionSuccess,
  setTransactionFailed,
  setTransactionInProgress,
  setTransactionId,
} = paymentSlice.actions;

export const selectPayment = (state) => state.payment;

const allState = createSlice({
  name: "stateall",
  initialState: {
    selectedSize: null,
    quantity: 1,
    setModalOpen: false
  },
  reducers: {
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },

  },
});

export const {
  setSelectedSize,
  setQuantity,
  setModalOpen
} = allState.actions;

export const selectState = (state) => state.stateall;

export default configureStore({
  reducer: {
    payment: paymentSlice.reducer,
    stateall: allState.reducer
  },
});