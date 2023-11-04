"use client";

import { PaymentMethod, Prisma } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

const regexUsername = /^\w{3,16}$/i;

type ProductWithPayments = Prisma.ProductGetPayload<{
  include: { paymentMethods: true };
}>;

export default function PurchaseModal({
  product,
}: {
  product: ProductWithPayments;
}) {
  const UsernameRef = useRef<HTMLInputElement>(null);
  const PaymentRef = useRef<HTMLSelectElement>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();

  const [Price, setPrice] = useState<number>(product.price);
  const [UsernameErr, setUsernameErr] = useState("");
  const [PaymentErr, setPaymentErr] = useState("");

  const [Quanity, setQuanity] = useState(product.minimumBuy || 1);

  async function validation() {
    if (!regexUsername.test(UsernameRef.current?.value || "")) {
      UsernameRef.current?.focus();
      setUsernameErr("Invalid Username");
      return false;
    }
    setUsernameErr("");
    if (paymentMethod) {
      PaymentRef.current?.focus();
      setPaymentErr("Please select a payment method");
      return false;
    }
    setPaymentErr("");
  }

  const calculatePrice = (quan: number, method?: PaymentMethod) => {
    const min = product.minimumBuy || 1;
    if (method)
      setPrice(
        (product.price / min + (product.price / min) * (method?.fee / 100)) *
          quan
      );
    else setPrice((product.price / min) * quan);
  };

  useEffect(() => calculatePrice(Quanity, paymentMethod), [paymentMethod]);

  useEffect(() => calculatePrice(Quanity, paymentMethod), [Quanity]);

  return (
    <Modal
      btn={"Buy"}
      label={`Purchasing ${product.name}`}
      request={() => {}}
      validation={validation}
    >
      <div className="flex my-10 ">
        <div className="flex-[0.3]">
          <img
            className="rounded-md max-h-[200px] aspect-auto mx-auto my-auto"
            src={product.imageUri || ""}
          />
        </div>
        <div className="flex-[0.7] max-h-[100px]">
          <h1>{product.description}</h1>
        </div>
      </div>
      <div className="form-control w-full text-center my-4">
        <span className="text-third font-bold text-2xl">{Price} zł</span>
      </div>
      {product.requireOnline && (
        <div className="text-center text-sm bg-secondary py-4 px-6 rounded-md mb-3">
          <label>
            You have to be connected to this server while purchasing item.
          </label>
        </div>
      )}
      {product.minimumBuy && product.maximumBuy && product.minimumBuy >= 1 && (
        <div className="form-control w-full mb-5">
          <label className="label">
            <span className="label-text">
              Quanity {`${Quanity}/${product.maximumBuy}`}
            </span>
          </label>
          <input
            min={product.minimumBuy}
            max={product.maximumBuy}
            step="1"
            type="range"
            className="range w-full"
            value={Quanity}
            onChange={(e) => setQuanity(Number.parseInt(e.target.value))}
          />
        </div>
      )}
      <Input
        name="Username"
        err={UsernameErr}
        ref={UsernameRef}
        maxLength={16}
      />
      <div className="form-control w-full mb-5">
        <label className="label">
          <span className="label-text">Choose a payment method</span>
        </label>
        <select
          onChange={(e) =>
            setPaymentMethod(
              product.paymentMethods.find(
                (x) => x.id === Number.parseInt(e.target.value)
              )
            )
          }
          defaultValue={"pick"}
          className="select bg-secondary"
          ref={PaymentRef}
        >
          <option value="pick" disabled>
            Pick one
          </option>
          {product.paymentMethods.map((paymentMethod) => (
            <option key={paymentMethod.id} value={paymentMethod.id}>
              {paymentMethod.provider} - {paymentMethod.fee}%
            </option>
          ))}
        </select>
      </div>
    </Modal>
  );
}