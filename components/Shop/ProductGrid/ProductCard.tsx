import { PaymentMethod, Prisma, Product } from "@prisma/client";
import PurchaseModal from "../../modals/PurchaseModal";

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
        <div className="bg-secondary flex py-5 px-4 gap-5 rounded-md hover:bg-third transition-colors cursor-pointer">
          <img
            style={{ height: 150, width: 150 }}
            className="object-contain"
            src={product.imageUri || ""}
            alt="Product"
          />
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex flex-col">
              <label className="text-lg mt-1">{product.name}</label>
              <label>{Currency.format(product.price)}</label>
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary">Zakup</button>
            </div>
          </div>
        </div>
      }
    />
  );
}
