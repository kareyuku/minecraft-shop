"use client";

import { PaymentMethod, Prisma } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

const regexUsername = /^\w{3,16}$/i;

type ProductWithPayments = Prisma.ProductGetPayload<{
  include: { paymentMethods: true };
}>;

export default function PurchaseModal({
  product,
}: {
  product: ProductWithPayments;
}) {
  const ModalRef = useRef<HTMLDialogElement>(null);
  const UsernameRef = useRef<HTMLInputElement>(null);
  const PaymentRef = useRef<HTMLSelectElement>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();

  const [Price, setPrice] = useState<number>(product.price);
  const [UsernameErr, setUsernameErr] = useState("");
  const [PaymentErr, setPaymentErr] = useState("");

  const [Quanity, setQuanity] = useState(product.minimumBuy || 1);

  function ShowModal() {
    ModalRef.current?.showModal();
  }

  async function SubmitPurchase() {
    if (!regexUsername.test(UsernameRef.current?.value || "")) {
      UsernameRef.current?.focus();
      return setUsernameErr("Invalid Username");
    }
    setUsernameErr("");
    if (paymentMethod) {
      PaymentRef.current?.focus();
      return setPaymentErr("Please select a payment method");
    }
    setPaymentErr("");
  }

  useEffect(() => {
    const min = product.minimumBuy || 1;
    if (paymentMethod)
      setPrice(
        (product.price / min +
          (product.price / min) * (paymentMethod?.fee / 100)) *
          Quanity
      );
  }, [paymentMethod]);

  useEffect(() => {
    const min = product.minimumBuy || 1;
    if (paymentMethod)
      setPrice(
        (product.price / min +
          (product.price / min) * (paymentMethod?.fee / 100)) *
          Quanity
      );
    else setPrice((product.price / min) * Quanity);
  }, [Quanity]);

  return (
    <>
      <button className="btn" onClick={ShowModal}>
        Buy
      </button>
      <dialog className="modal" ref={ModalRef}>
        <div className="modal-box flex flex-col items-start bg-secondary max-h-none">
          <h3 className="font-bold text-lg">Purchase {product.name}</h3>
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
          {product.requireOnline && (
            <div className="text-center text-sm bg-primary py-4 px-6 rounded-md mb-3">
              <label>
                You have to be connected to this server while purchasing item.
              </label>
            </div>
          )}
          <div className="form-control w-full text-left">
            <span className="text-green-500 font-bold text-2xl">
              {Price} zł
            </span>
          </div>
          {product.minimumBuy &&
            product.maximumBuy &&
            product.minimumBuy >= 1 && (
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
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Username</span>
              <span className="label-text-alt text-red-500 font-bold">
                {UsernameErr}
              </span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input bg-primary w-full"
              ref={UsernameRef}
            />
          </div>
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
              className="select bg-primary"
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
          <div className="modal-action">
            <button
              onClick={SubmitPurchase}
              className="btn bg-third text-green-300 mr-3"
            >
              Confirm
            </button>
            <button onClick={() => ModalRef.current?.close()} className="btn">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
