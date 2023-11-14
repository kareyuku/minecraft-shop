"use client";
import { useRef, useState } from "react";
import Modal from "@/components/ui/Modal";
import { PaymentMethod } from "@prisma/client";
import Input from "@/components/ui/Input";

interface IPaymentEditProps {
  paymentOption: PaymentMethod;
  callback: Function;
}

export default function PaymentEdit({
  paymentOption,
  callback,
}: IPaymentEditProps) {
  const secretKeyRef = useRef<HTMLInputElement>(null);
  const feeRef = useRef<HTMLInputElement>(null);
  const [secretErr, setSecretErr] = useState("");

  const validate = async () => {
    if (!secretKeyRef.current?.value) {
      setSecretErr("You have to provide secret key");
      secretKeyRef.current?.focus();
      return false;
    }
    setSecretErr("");
    return true;
  };

  const request = async () => {
    const response = await fetch(`/api/payments/${paymentOption.provider}`, {
      method: "PATCH",
      body: JSON.stringify({
        fee: parseFloat(feeRef.current?.value as string),
        secret: secretKeyRef.current?.value,
      }),
    });
    if (response.status === 200) callback(await response.json());
    return response;
  };

  return (
    <Modal
      btn="Modify"
      label="Modify Payment Method"
      request={request}
      validation={validate}
    >
      <Input
        err={secretErr}
        name="Secret Key"
        defaultValue={paymentOption.secret}
        ref={secretKeyRef}
      />
      <Input
        err={""}
        name="Provider Fee %"
        type="number"
        min="0"
        defaultValue={paymentOption.fee}
        ref={feeRef}
      />
    </Modal>
  );
}
