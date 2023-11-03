"use client";

import { FaEdit } from "react-icons/fa";
import { AiFillDelete, AiFillInfoCircle } from "react-icons/ai";
import { Server } from "@prisma/client";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { useRef, useState } from "react";

export default function ServerCard({
  server,
  removeServer,
  editServer,
}: {
  server: Server;
  removeServer: Function;
  editServer: Function;
}) {
  const serverName = useRef<HTMLInputElement>(null);
  const serverIP = useRef<HTMLInputElement>(null);

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
    };
    const response = await fetch(`/api/servers/${server.id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    if (response.status == 200) editServer(await response.json());
    return response;
  };

  return (
    <div className="card bg-secondary p-4">
      <div className="flex gap-3">
        <div
          className={
            "card__image bg-primary h-[100px] w-[100px] rounded-md p-5 "
          }
          style={{ height: 100, width: 100 }}
        >
          <img src={server.imageUri || ""} />
        </div>
        <div className="flex flex-col">
          <label>
            Name: <span>{server.name}</span>
          </label>
          <label>
            IP: <span>{server.ip}</span>
          </label>
        </div>
      </div>
      <div className="justify-end flex gap-2">
        <button className="btn">
          <AiFillInfoCircle />
        </button>
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
        </Modal>
        <Modal
          btn={<AiFillDelete />}
          label="Are you sure you want to delete a server?"
          request={async () => {
            const response = await fetch(`/api/servers/${server.id}`, {
              method: "DELETE",
            });
            if (response.status === 200) removeServer(server.id);
            return response;
          }}
          validation={() => true}
        >
          <label>
            You are deleting <b>{server.name}</b>, all products connected to
            this server will be removed!
          </label>
        </Modal>
      </div>
    </div>
  );
}
