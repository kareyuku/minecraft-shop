"use client";
import Modal from "../Modal";

export default function PaymentOption() {
  return (
    <div>
      <div className="bg-secondary flex flex-col items-center p-5 rounded-md hover:bg-third transition-colors cursor-pointer">
        <img
          style={{ height: 150, width: 150 }}
          className="object-contain"
          src={
            "https://assets.stickpng.com/images/5842a8e9a6515b1e0ad75b01.png"
          }
          alt="PaymentLogo"
        />
        <label className="text-lg mt-1">Stripe</label>
        <Modal
          btn="DELETE"
          label="Delete Payment Method"
          request={() => {}}
          validation={() => true}
        >
          Are you sure you want to delete a payment method?
        </Modal>
        <Modal
          btn="Modify"
          label="Modify Payment Method"
          request={() => {}}
          validation={() => false}
        >
          delete
        </Modal>
      </div>
    </div>
  );
}
