// paymentReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PaymentState {
  transactionID: string;
  success: boolean;
  error: boolean;
  loading: boolean;
}

const initialState: PaymentState = {
  transactionID: '',
  success: false,
  error: false,
  loading: false,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    initiatePayment(state) {
      state.loading = true;
    },
    paymentSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = true;
      state.transactionID = action.payload;
    },
    paymentFailure(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { initiatePayment, paymentSuccess, paymentFailure } = paymentSlice.actions;

// Selector para seleccionar el estado de pago
export const selectPayment = (state: RootState) => state.payment;

export default paymentSlice.reducer;
