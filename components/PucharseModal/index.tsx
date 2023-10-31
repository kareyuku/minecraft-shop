"use client";

import { useRef, useState } from "react";

type ProductProps = {
  name: string;
  img?: string;
};

export default function PucharseModal({ name, img }: ProductProps) {
  const ModalRef = useRef<HTMLDialogElement>(null);
  const [Quanity, setQuanity] = useState(1);
  function ShowModal() {
    ModalRef.current?.showModal();
  }

  return (
    <>
      <button className="btn" onClick={ShowModal}>
        Buy
      </button>
      <dialog id="my_modal_1" className="modal" ref={ModalRef}>
        <div className="modal-box flex flex-col items-start">
          <h3 className="font-bold text-lg">Pucharse Skrzynia Skarbów</h3>
          <div className="flex my-10 ">
            <div className="flex-[0.3]">
              <img
                className="rounded-md max-h-[200px] aspect-auto mx-auto my-auto"
                src={img}
              />
            </div>
            <div className="flex-[0.7] max-h-[100px]">
              <h1>hejcia</h1>
            </div>
          </div>
          <div className="form-control w-full mb-5">
            <label className="label">
              <span className="label-text">Quanity {`${Quanity}/200`}</span>
            </label>
            <input
              min={1}
              max={200}
              step="1"
              type="range"
              className="range w-full"
              value={Quanity}
              onChange={(e) => setQuanity(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="form-control w-full mb-5">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-success">Confirm</button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
