"use client";
import { PaymentMethod, PaymentProvider } from "@prisma/client";
import { useState } from "react";

export const usePayments = (data: PaymentMethod[]) => {
  const [payments, setPayments] = useState<PaymentMethod[]>(data);

  const addPayment = (newPayment: PaymentMethod) =>
    setPayments((prev) => [...prev, newPayment]);

  const removePayment = (provider: PaymentProvider) =>
    setPayments((prev) =>
      prev.filter((payment) => payment.provider !== provider)
    );

  const editPayment = (paymentMethod: PaymentMethod) => {
    const oldPayments = [...payments];
    const index = oldPayments.findIndex(
      (payment) => payment.provider === paymentMethod.provider
    );
    oldPayments[index] = paymentMethod;
    setPayments(oldPayments);
  };

  return { payments, addPayment, removePayment, editPayment };
};
