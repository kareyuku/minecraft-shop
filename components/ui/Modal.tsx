"use client";

import { useRef, useState } from "react";

interface IModalProps {
  btn: string | React.ReactNode;
  label: string;
  style?: "dark" | "bright";
  validation?: Function;
  request: Function;
  customBtn?: React.ReactNode;
  children: React.ReactNode;
}

export default function Modal(modalProps: IModalProps) {
  const { btn, label, validation, children, request, style, customBtn } =
    modalProps;

  const modalRef = useRef<HTMLDialogElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const SubmitModal = async (e: any) => {
    e.preventDefault();
    if (!btnRef.current) return;
    btnRef.current.disabled = true;
    if (validation) {
      if (!(await validation())) return (btnRef.current.disabled = false);
    }
    setLoading(true);
    const response = await request();
    setLoading(false);
    if (response.status == 200) {
      modalRef.current?.close();
      formRef.current?.reset();
    }
    btnRef.current.disabled = false;
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
          <div className="p-5 w-[100%] flex flex-col gap-y-1">
            <form ref={formRef} onSubmit={SubmitModal}>
              <h3 className="font-bold text-lg mb-5 text-third">{label}</h3>
              {children}
              <div className="modal-action">
                <button
                  type="submit"
                  className="btn text-white hover:bg-third"
                  ref={btnRef}
                >
                  Confirm
                </button>
                <button
                  onClick={() => modalRef.current?.close()}
                  className="btn text-white hover:bg-red-500"
                  type="reset"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
