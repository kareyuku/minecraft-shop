"use client";

import { useRef, useState } from "react";
import { BsGiftFill } from "react-icons/bs";
import Input from "../Input";
import Modal from "../Modal";

const regexUsername = /^\w{3,16}$/i;

export default function VoucherModal() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const [usernameErr, setusernameErr] = useState("");
  const [codeErr, setcodeErr] = useState("");

  async function validation() {
    if (!usernameRef || !codeRef) return false;
    if (!regexUsername.test(usernameRef.current?.value || "")) {
      usernameRef.current?.focus();
      setusernameErr("Invalid username");
      return false;
    }
    setusernameErr("");
  }

  return (
    <Modal
      label="Reedem Voucher"
      btn={
        <span className="flex gap-2">
          <BsGiftFill /> Reedem Voucher
        </span>
      }
      request={() => {}}
      validation={validation}
    >
      <div className="text-center text-sm bg-background py-4 px-6 rounded-md mb-3 mt-5">
        <label>
          You have to be connected to this server while purchasing item.
        </label>
      </div>

      <Input
        name={"Username"}
        err={usernameErr}
        ref={usernameRef}
        maxLength={16}
      />
      <Input name={"Code"} err={codeErr} ref={codeRef} />
    </Modal>
  );
}
