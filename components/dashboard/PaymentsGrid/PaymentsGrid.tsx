"use client";

import { PaymentMethod } from "@prisma/client";
import { useEffect, useState } from "react";
import PaymentOption from "../PaymentOption";

export default function PaymentsGrid() {
  const [payments, setPayments] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPaymentsOptions = async () => {
    const request = await fetch("/api/payments");
    const data = await request.json();
    setPayments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPaymentsOptions();
  }, []);

  if (loading) return "Loading";

  return (
    <div className="grid grid-cols-5 mt-5">
      {payments.map((payment) => (
        <PaymentOption data={payment} />
      ))}
    </div>
  );
}
