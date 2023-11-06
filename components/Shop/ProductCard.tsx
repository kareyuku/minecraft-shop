import { PaymentMethod, Prisma, Product } from "@prisma/client";
import PurchaseModal from "../Modals/PurchaseModal";

export default function ProductCard({
  product,
  paymentsMethods,
}: {
  product: Product;
  paymentsMethods: PaymentMethod[];
}) {
  let Currency = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
  return (
    <PurchaseModal
      product={product}
      payments={paymentsMethods}
      card={
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
      }
    />
  );
}
