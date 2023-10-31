import Link from "next/link";

type ProductProps = {
  name: string;
  price: number;
  img?: string;
};

export default function ProductCard({ name, img, price }: ProductProps) {
  let Currency = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
  return (
    <div className="card bg-secondary p-4 rounded-md hover:bg-third transition-colors text-center flex flex-col justify-between">
      <img
        className="rounded-md h-[150px] max-h-[150px]"
        width={"100%"}
        height={50}
        src={img}
      />
      <div className="flex flex-col gap-3 mt-3">
        <label>{name}</label>
        <label className="text-green-400 font-bold">
          {Currency.format(price)}
        </label>
        <button className="bg-green-400 px-6 py-2 rounded-lg">Zakup</button>
      </div>
    </div>
  );
}
