"use client";

import { useRef, useState } from "react";
import Input from "../Input";

export default function CreateProductModal({ serverId }: { serverId: number }) {
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
        Add Product
      </button>
      <dialog className="modal" ref={ModalRef}>
        <div className="modal-box flex flex-col items-start bg-secondary max-h-none">
          <h3 className="font-bold text-lg">New Product</h3>
          <Input name="Name" err={UsernameErr} ref={UsernameRef} />
          <Input name="Price" err={UsernameErr} />
          <div className="modal-action">
            <button
              onClick={ReedemVoucher}
              className="btn text-white bg-third mr-3"
            >
              Create
            </button>
            <button onClick={() => ModalRef.current?.close()} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
