"use client";

import { useRef, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

export default function CreateProductModal({ serverId }: { serverId: number }) {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [nameErr, setNameErr] = useState("");
  const [priceErr, setPriceErr] = useState("");

  async function validation() {
    return true;
  }

  async function request() {
    const body = {
      name: nameRef.current?.value,
      price: Number.parseFloat(priceRef.current?.value || "1"),
    };
    const response = await fetch(`/api/servers/${serverId}/products`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return response;
  }

  return (
    <Modal
      btn={"Create a Product"}
      label={"Creating Product"}
      request={request}
      validation={validation}
    >
      <Input name="Name" err={nameErr} ref={nameRef} />
      <Input
        name="Price"
        err={priceErr}
        type="number"
        min={1}
        defaultValue={1}
        ref={priceRef}
      />
      <Input name="Image" err={""} ref={imageRef} />
      <Input name="Description" err={""} />
    </Modal>
  );
}
