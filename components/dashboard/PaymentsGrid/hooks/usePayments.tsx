"use client";
import { PaymentMethod, PaymentProvider } from "@prisma/client";
import { useEffect, useState } from "react";

export const usePayments = () => {
  const [payments, setPayments] = useState<PaymentMethod[]>([]);

  const fetchPayments = async () => {
    const response = await fetch("/api/payments");
    const data = await response.json();
    return setPayments(data);
  };

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

  useEffect(() => {
    fetchPayments();
  }, []);

  return { payments, addPayment, removePayment, editPayment };
};
