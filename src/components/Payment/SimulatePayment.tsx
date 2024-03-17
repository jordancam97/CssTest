const simulatePayment = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.cardNumber && /^(0|1|2|7|8|9)/.test(data.cardNumber)) {
        reject({ success: false, message: "Payment error" });
      } else {
        resolve({ success: true, message: "Successful payment" });
      }
    }, 1000);
  });
};

export { simulatePayment };
