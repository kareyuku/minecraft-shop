import { PaymentMethod } from "@prisma/client";

export default function PaymentOption({
  paymentMethod,
  price,
  quanity,
}: {
  paymentMethod: PaymentMethod;
  price: number;
  quanity: number;
}) {
  return (
    <div className="flex flex-col bg-primary rounded-md w-[140px] h-[80px] justify-center items-center">
      <img
        className="mx-auto my-auto"
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png"
        }
      ></img>
      {/* <label>{paymentMethod.provider}</label>
      <label>{price}</label> */}
    </div>
  );
}
