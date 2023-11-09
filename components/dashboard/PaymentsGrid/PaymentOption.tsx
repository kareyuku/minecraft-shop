"use client";
import { PaymentMethod } from "@prisma/client";
import Modal from "../../Modal";
import { useRef, useState } from "react";
import Input from "../../Input";

export default function PaymentOption({ data }: { data: PaymentMethod }) {
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
  return (
    <div className="bg-secondary flex flex-col items-center p-5 rounded-md hover:bg-third transition-colors cursor-pointer">
      {/* <img
          style={{ height: 150, width: 150 }}
          className="object-contain"
          src={
            "https://assets.stickpng.com/images/5842a8e9a6515b1e0ad75b01.png"
          }
          alt="PaymentLogo"
        /> */}
      <label className="text-lg mt-1">{data.provider}</label>
      <div className="flex pt-5 gap-3">
        <Modal
          btn="Modify"
          label="Modify Payment Method"
          request={async () =>
            await fetch(`/api/payments/${data.id}`, {
              method: "DELETE",
            })
          }
          validation={validate}
        >
          <Input
            err={secretErr}
            name="Secret Key"
            defaultValue={data.secret}
            ref={secretKeyRef}
          />
          <Input
            err={""}
            name="Provider Fee %"
            type="number"
            min="0"
            defaultValue={data.fee}
            ref={feeRef}
          />
        </Modal>
        <Modal
          btn="DELETE"
          label="Delete Payment Method"
          request={async () =>
            await fetch(`/api/payments/${data.id}`, {
              method: "DELETE",
            })
          }
          validation={() => true}
        >
          Are you sure you want to delete a payment method?
        </Modal>
      </div>
    </div>
  );
}
