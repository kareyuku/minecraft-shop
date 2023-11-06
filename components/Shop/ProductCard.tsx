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
    <div className="bg-secondary flex flex-col items-center p-5 rounded-md hover:bg-third transition-colors cursor-pointer">
      <img
        style={{ height: 150, width: 150 }}
        className="object-contain"
        src={product.imageUri || ""}
        alt="Product"
      />
      <label className="text-lg mt-1">{product.name}</label>
      <label>{Currency.format(product.price)}</label>
    </div>
  );
}
