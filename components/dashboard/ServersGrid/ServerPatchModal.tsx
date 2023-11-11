import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { Server } from "@prisma/client";
import { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";

interface IServerPatchModal {
  server: Server;
  callback: Function;
}

export default function ServerPatchModal(props: IServerPatchModal) {
  const { server, callback } = props;

  const serverName = useRef<HTMLInputElement>(null);
  const serverIP = useRef<HTMLInputElement>(null);
  const serverImage = useRef<HTMLInputElement>(null);

  const [nameErr, setNameErr] = useState("");
  const [ipErr, setIpErr] = useState("");

  const validation = () => {
    if (!serverName.current?.value) return setNameErr("Invalid Server Name");
    setNameErr("");
    return true;
  };

  const patch = async () => {
    const body = {
      ip: serverIP.current?.value,
      name: serverName.current?.value,
      imageUri: serverImage.current?.value,
    };
    const response = await fetch(`/api/servers/${server.id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    if (response.status == 200) callback(await response.json());

    return response;
  };

  return (
    <Modal
      label="Editing Server"
      request={patch}
      validation={validation}
      btn={<FaEdit />}
    >
      <Input
        name="Server Name"
        ref={serverName}
        err={nameErr}
        maxLength={50}
        defaultValue={server.name}
      />
      <Input
        name="Server IP"
        ref={serverIP}
        err=""
        maxLength={50}
        defaultValue={server.ip}
      />
      <Input
        name="Server Image"
        ref={serverImage}
        err={""}
        maxLength={256}
        defaultValue={server.imageUri || ""}
      />
    </Modal>
  );
}
