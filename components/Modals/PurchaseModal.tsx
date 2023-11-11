"use client";

import { PaymentMethod, Prisma, Product } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

const regexUsername = /^\w{3,16}$/i;

export default function PurchaseModal({
  product,
  payments,
  card,
}: {
  product: Product;
  payments: PaymentMethod[];
  card: React.ReactNode;
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
    if (!paymentMethod) {
      PaymentRef.current?.focus();
      setPaymentErr("Please select a payment method");
      return false;
    }
    setPaymentErr("");
    return true;
  }

  async function request() {
    const body = {
      id: product.id,
      quanity: Quanity,
      provider: paymentMethod?.id,
    };
    const response = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status === 303) window.location.assign(data.url);
    return response;
  }

  const calculatePrice = (quan: number, method?: PaymentMethod) => {
    const min = product.minimumBuy || 1;
    if (method)
      setPrice(
        Math.floor(
          ((product.price / min + (product.price / min) * (method?.fee / 100)) *
            quan +
            Number.EPSILON) *
            100
        ) / 100
      );
    else
      setPrice(
        Math.round(((product.price / min) * quan + Number.EPSILON) * 100) / 100
      );
  };

  useEffect(() => calculatePrice(Quanity, paymentMethod), [paymentMethod]);

  useEffect(() => calculatePrice(Quanity, paymentMethod), [Quanity]);

  return (
    <Modal
      btn={""}
      customBtn={card}
      label={`Purchasing ${product.name}`}
      request={request}
      validation={validation}
    >
      <div className="flex mt-10 mb-5 max-sm:flex-col gap-4">
        <img
          className={
            product.description
              ? "rounded-md h-[100px] w-[100px] aspect-auto my-auto"
              : "rounded-md h-[100px] w-[100px] aspect-auto my-auto mx-auto"
          }
          src={product.imageUri || ""}
        />
        <h1>{product.description}</h1>
      </div>
      <div className="form-control w-full text-center">
        <span className="text-third font-bold text-2xl">{Price} zł</span>
      </div>
      {product.requireOnline && (
        <div className="text-center text-sm bg-secondary py-4 px-6 rounded-md mb-3 mt-5">
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
        required
      />
      <div className="form-control w-full mb-5">
        <label className="label">
          <span className="label-text">Choose a payment method</span>
        </label>
        <select
          onChange={(e) =>
            setPaymentMethod(
              payments.find((x) => x.id === Number.parseInt(e.target.value))
            )
          }
          defaultValue={"pick"}
          className="select bg-secondary"
          ref={PaymentRef}
        >
          <option defaultValue="pick">Pick one</option>
          {payments.map((paymentMethod) => (
            <option key={paymentMethod.id} value={paymentMethod.id}>
              {paymentMethod.provider} - {paymentMethod.fee}%
            </option>
          ))}
        </select>
      </div>
    </Modal>
  );
}
