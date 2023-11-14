"use client";
import { useRef, useState } from "react";
import { PaymentMethod } from "@prisma/client";

import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import DeleteModal from "@/components/modals/DeleteModal";
import PaymentEdit from "./modals/PaymentEdit";

interface IPaymentOptionProps {
  paymentOption: PaymentMethod;
  editPayment: Function;
  removePayment: Function;
}

export default function PaymentOption(props: IPaymentOptionProps) {
  const { paymentOption, editPayment, removePayment } = props;

  return (
    <div className="bg-secondary flex flex-col items-center p-5 rounded-md hover:bg-third transition-colors cursor-pointer">
      <label className="text-lg mt-1">{paymentOption.provider}</label>
      <div className="flex pt-5 gap-3">
        <PaymentEdit paymentOption={paymentOption} callback={editPayment} />
        <DeleteModal
          action={`/api/payments/${paymentOption.provider}`}
          callback={removePayment}
          header="Deleting a Payment Method"
          text="Are you sure you want to delete a payment method?"
        />
      </div>
    </div>
  );
}
