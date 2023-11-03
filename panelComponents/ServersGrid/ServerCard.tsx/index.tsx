"use client";

import { FaEdit } from "react-icons/fa";
import { AiFillDelete, AiFillInfoCircle } from "react-icons/ai";
import { Server } from "@prisma/client";
import Modal from "@/components/Modal";

export default function ServerCard({ server }: { server: Server }) {
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
        <button className="btn">
          <FaEdit />
        </button>
        <Modal
          btn={<AiFillDelete />}
          label="Are you sure you want to delete a server?"
          request={async () =>
            await fetch(`/api/servers/${server.id}`, { method: "DELETE" })
          }
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
