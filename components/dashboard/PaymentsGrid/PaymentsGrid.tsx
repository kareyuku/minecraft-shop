"use client";

import PaymentOption from "./PaymentOption";
import CreatePaymentMethod from "@/components/modals/CreatePaymentMethod";
import { usePayments } from "./hooks/usePayments";

export default function PaymentsGrid({ data }: { data: any }) {
  const { payments, addPayment, removePayment, editPayment } =
    usePayments(data);
  return (
    <>
      <CreatePaymentMethod callback={addPayment} />
      <div className="grid grid-cols-3 gap-3 mt-5">
        {payments.length < 1
          ? "Loading..."
          : payments.map((payment) => (
              <PaymentOption
                paymentOption={payment}
                removePayment={removePayment}
                editPayment={editPayment}
                key={payment.provider}
              />
            ))}
      </div>
    </>
  );
}
