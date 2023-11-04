import { Prisma } from "@prisma/client";
import PurchaseModal from "../Modals/PurchaseModal";

type ProductWithPayments = Prisma.ProductGetPayload<{
  include: { paymentMethods: true };
}>;

export default function ProductCard({
  product,
}: {
  product: ProductWithPayments;
}) {
  let Currency = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
  return (
    <div className="card bg-secondary p-4 rounded-md hover:bg-third transition-colors text-center flex flex-col justify-between">
      <img
        className="rounded-md max-h-[200px] aspect-auto mx-auto my-auto"
        src={product.imageUri || ""}
      />
      <div className="flex flex-col gap-3 mt-3">
        <label>{product.name}</label>
        <label className="text-green-400 font-bold">
          {Currency.format(product.price)}
        </label>
        <PurchaseModal product={product} />
      </div>
    </div>
  );
}
