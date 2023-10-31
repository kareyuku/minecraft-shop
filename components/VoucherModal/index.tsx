"use client";

import { useRef, useState } from "react";
import { BsGiftFill } from "react-icons/bs";

export default function VoucherModal() {
  const ModalRef = useRef<HTMLDialogElement>(null);
  const UsernameRef = useRef<HTMLInputElement>(null);
  const CodeRef = useRef<HTMLInputElement>(null);
  const [UsernameErr, setUsernameErr] = useState("");
  const [CodeErr, setCodeErr] = useState("");
  function ShowModal() {
    ModalRef.current?.showModal();
  }

  const regexUsername = /^\w{3,16}$/i;

  async function ReedemVoucher() {
    if (!UsernameRef || !CodeRef) return;
    if (!regexUsername.test(UsernameRef.current?.value || "")) {
      UsernameRef.current?.focus();
      return setUsernameErr("Invalid username");
    }
    setUsernameErr("");
  }

  return (
    <>
      <button className="btn hover:bg-third text-white" onClick={ShowModal}>
        <BsGiftFill />
        Reedem Voucher
      </button>
      <dialog className="modal" ref={ModalRef}>
        <div className="modal-box flex flex-col items-start bg-secondary max-h-none">
          <h3 className="font-bold text-lg">Reedem a Voucher</h3>
          <div className="text-center text-sm bg-primary py-4 px-6 rounded-md mb-3 mt-5">
            <label>
              You have to be connected to this server while purchasing item.
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Username</span>
              {UsernameErr && (
                <span className="label-text-alt text-red-500 font-bold">
                  {UsernameErr}
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="Type here"
              className={
                UsernameErr
                  ? "input bg-primary w-full input-error"
                  : "input bg-primary w-full "
              }
              ref={UsernameRef}
              maxLength={16}
            />
          </div>
          <div className="form-control w-full mb-5">
            <label className="label">
              <span className="label-text">Code</span>
              {CodeErr && (
                <span className="label-text-alt text-red-500 font-bold">
                  {CodeErr}
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="Type here"
              className={
                CodeErr
                  ? "input input-error bg-primary w-full"
                  : "input bg-primary w-full"
              }
              ref={CodeRef}
            />
          </div>
          <div className="modal-action">
            <button
              onClick={ReedemVoucher}
              className="btn bg-third text-green-300 mr-3"
            >
              Reedem
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
