"use client";
import Modal from "../Modal";

import { AiFillDelete } from "react-icons/ai";

interface IDeleteModalProps {
  header: string;
  text: string;
  action: string;
  callback: Function;
}

export default function DeleteModal(props: IDeleteModalProps) {
  const { header, text, action, callback } = props;

  const request = async () => {
    const response = await fetch(action, { method: "DELETE" });
    if (response.status === 200) {
      const { id } = await response.json();
      callback && callback(id);
    }
    return response;
  };

  return (
    <Modal btn={<AiFillDelete />} label={header} request={request}>
      <label>{text}</label>
    </Modal>
  );
}
