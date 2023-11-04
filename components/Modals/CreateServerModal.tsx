"use client";

import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useRef, useState } from "react";

export default function CreateServerModal({
  addServer,
}: {
  addServer: Function;
}) {
  const serverName = useRef<HTMLInputElement>(null);
  const serverIP = useRef<HTMLInputElement>(null);
  const serverImage = useRef<HTMLInputElement>(null);

  const [serverNameErr, setNameErr] = useState("");
  const [serverIpErr, setIpErr] = useState("");

  const validation = () => {
    if (!serverName.current?.value) return setNameErr("Invalid Server Name");
    setNameErr("");
    return true;
  };

  const request = async () => {
    const data = {
      ip: serverIP.current?.value || "s",
      name: serverName.current?.value || "s",
      imageUri: serverImage.current?.value,
    };

    const response = await fetch("/api/servers", {
      method: "POST",
      body: JSON.stringify(data),
    });

    addServer(await response.json());

    return response;
  };

  return (
    <>
      <Modal
        btn="Create a server"
        label="Creating server"
        validation={validation}
        request={request}
        style={"bright"}
      >
        <Input
          name="Server Name"
          ref={serverName}
          err={serverNameErr}
          maxLength={50}
        />
        <Input
          name="Server IP"
          ref={serverIP}
          err={serverIpErr}
          maxLength={50}
        />
        <Input name="Server Image" ref={serverImage} err={""} maxLength={256} />
      </Modal>
    </>
  );
}
