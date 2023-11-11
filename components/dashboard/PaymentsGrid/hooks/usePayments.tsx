"use client";
import { PaymentMethod } from "@prisma/client";
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

  const removePayment = (paymentId: number) =>
    setPayments((prev) => prev.filter((payment) => payment.id !== paymentId));

  const editPayment = (paymentMethod: PaymentMethod) => {
    const oldPayments = [...payments];
    const index = oldPayments.findIndex(
      (payment) => payment.id === paymentMethod.id
    );
    oldPayments[index] = paymentMethod;
    setPayments(oldPayments);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return { payments, addPayment, removePayment, editPayment };
};
