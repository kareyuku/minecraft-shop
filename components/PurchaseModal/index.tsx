"use client";

import { useRef, useState } from "react";

type ProductProps = {
  name: string;
  img?: string;
};

const regexUsername = /^\w{3,16}$/i;

export default function PurchaseModal({ name, img }: ProductProps) {
  const ModalRef = useRef<HTMLDialogElement>(null);
  const UsernameRef = useRef<HTMLInputElement>(null);
  const PaymentRef = useRef<HTMLSelectElement>(null);

  const [UsernameErr, setUsernameErr] = useState("");
  const [PaymentErr, setPaymentErr] = useState("");

  const [Quanity, setQuanity] = useState(1);

  function ShowModal() {
    ModalRef.current?.showModal();
  }

  async function SubmitPurchase() {
    if (!regexUsername.test(UsernameRef.current?.value || "")) {
      UsernameRef.current?.focus();
      return setUsernameErr("Invalid Username");
    }
    setUsernameErr("");
    if (
      !PaymentRef.current?.value ||
      PaymentRef.current?.value === "Pick one"
    ) {
      PaymentRef.current?.focus();
      return setPaymentErr("Please select a payment method");
    }
    setPaymentErr("");
  }

  return (
    <>
      <button className="btn" onClick={ShowModal}>
        Buy
      </button>
      <dialog className="modal" ref={ModalRef}>
        <div className="modal-box flex flex-col items-start bg-secondary max-h-none">
          <h3 className="font-bold text-lg">Purchase {name}</h3>
          <div className="flex my-10 ">
            <div className="flex-[0.3]">
              <img
                className="rounded-md max-h-[200px] aspect-auto mx-auto my-auto"
                src={img}
              />
            </div>
            <div className="flex-[0.7] max-h-[100px]">
              <h1>hejcia</h1>
            </div>
          </div>
          <div className="text-center text-sm bg-primary py-4 px-6 rounded-md mb-3">
            <label>
              You have to be connected to this server while purchasing item.
            </label>
          </div>
          <div className="form-control w-full mb-5">
            <label className="label">
              <span className="label-text">Quanity {`${Quanity}/200`}</span>
            </label>
            <input
              min={1}
              max={200}
              step="1"
              type="range"
              className="range w-full"
              value={Quanity}
              onChange={(e) => setQuanity(Number.parseInt(e.target.value))}
            />
          </div>
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
            <select className="select bg-primary" ref={PaymentRef}>
              <option disabled selected>
                Pick one
              </option>
              <option value="stripe">Stripe</option>
              <option value="przelewy24">Przelewy24</option>
              <option value="paypal">Paypal</option>
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
