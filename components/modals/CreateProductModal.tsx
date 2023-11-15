"use client";

import { useRef, useState } from "react";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

export default function CreateProductModal({
  serverId,
  callback,
}: {
  serverId: string;
  callback: Function;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const requiredOnlineRef = useRef<HTMLInputElement>(null);
  const minimumBuyRef = useRef<HTMLInputElement>(null);
  const maximumBuyRef = useRef<HTMLInputElement>(null);

  const [nameErr, setNameErr] = useState("");
  const [priceErr, setPriceErr] = useState("");

  async function validation() {
    if (!nameRef.current?.value) {
      setNameErr("Required");
      return false;
    }
    setNameErr("");
    if (!priceRef.current?.value) return false;
    if (!requiredOnlineRef.current?.value) return false;
    if (
      parseInt(minimumBuyRef.current?.value as string) >
      parseInt(maximumBuyRef.current?.value as string)
    ) {
      setNameErr("uwu");
      return false;
    }

    return true;
  }

  async function request() {
    const body = {
      id: serverId,
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      price: Number.parseFloat(priceRef.current?.value || "1"),
      imageUri: imageRef.current?.value,
      requireOnline: requiredOnlineRef.current?.value ? true : false,
      minimumBuy: parseInt(minimumBuyRef.current?.value || "1"),
      maximumBuy: parseInt(maximumBuyRef.current?.value || "1"),
    };
    const response = await fetch(`/api/products`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (response.status === 200) callback(serverId, await response.json());
    return response;
  }

  return (
    <Modal
      btn={""}
      customBtn={
        <button className="btn bg-background hover:bg-third text-white">
          Create a Product
        </button>
      }
      label={"Creating Product"}
      request={request}
      validation={validation}
      style={"bright"}
    >
      <Input name="Name" err={nameErr} ref={nameRef} required />
      <Input name="Description" err={""} ref={descriptionRef} />
      <Input
        name="Price"
        err={priceErr}
        type="number"
        min={1}
        defaultValue={1}
        ref={priceRef}
        required
      />
      <Input name="Image URL" err={""} ref={imageRef} placeholder="Paste URL" />
      <div className="flex gap-3">
        <Input
          name="Minimum Buy"
          err={priceErr}
          type="number"
          min={1}
          defaultValue={1}
          ref={minimumBuyRef}
        />
        <Input
          name="Maximum Buy"
          err={priceErr}
          type="number"
          min={1}
          defaultValue={1}
          ref={maximumBuyRef}
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Require Online</span>
        </label>
        <div className="flex bg-secondary rounded-md justify-between  p-4">
          <span className="text-base-content">
            Player must be online to receive item!
          </span>
          <input
            type="checkbox"
            className="toggle toggle-md"
            ref={requiredOnlineRef}
          />
        </div>
      </div>
    </Modal>
  );
}
