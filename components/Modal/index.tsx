"use client";

import { useRef, useState } from "react";

type ModalProps = {
  btn: string | React.ReactNode;
  label: string;
  validation: Function;
  children: React.ReactNode;
  request: Function;
  style?: "dark" | "bright";
  customBtn?: React.ReactNode;
};

export default function Modal({
  btn,
  label,
  children,
  validation,
  request,
  style,
  customBtn,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const SubmitModal = async () => {
    const validate = await validation();
    if (!validate) return;
    setLoading(true);
    const response = await request();
    setLoading(false);
    if (response.status == 200) {
      modalRef.current?.close();
    }
  };

  const [loading, setLoading] = useState(false);

  return (
    <>
      {customBtn && (
        <div onClick={() => modalRef.current?.showModal()}>{customBtn}</div>
      )}
      {!customBtn && (
        <button
          onClick={() => modalRef.current?.showModal()}
          className={
            style == "bright"
              ? "btn bg-secondary hover:bg-third text-white"
              : "btn text-white"
          }
        >
          <span>{btn}</span>
        </button>
      )}

      <dialog className="modal" ref={modalRef}>
        <div className="modal-box flex flex-col items-start bg-background max-h-none p-0">
          {loading && (
            <div
              className="absolute mx-auto my-auto w-[100%] h-[100%] flex justify-center items-center"
              style={{ background: "rgba(1,1,1,0.5)" }}
            >
              <span className="loading loading-spinner loading-lg "></span>
            </div>
          )}
          <div className="p-5 w-[100%]">
            <h3 className="font-bold text-lg mb-5 text-third">{label}</h3>
            {children}
            <div className="modal-action">
              <button
                onClick={SubmitModal}
                className="btn text-white hover:bg-third"
              >
                Confirm
              </button>
              <button
                onClick={() => modalRef.current?.close()}
                className="btn text-white hover:bg-red-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
