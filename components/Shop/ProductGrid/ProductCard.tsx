import { PaymentMethod, Product } from "@prisma/client";
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
        <div className="bg-secondary flex py-5 px-4 gap-5 rounded-md hover:bg-third transition-colors cursor-pointer max-sm:flex-col">
          <img
            style={{ height: 150, width: 150 }}
            className="object-contain"
            src={product.imageUri || ""}
            alt="Product"
          />
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex flex-col">
              <label className="text-xl my-2 truncate text-ellipsis">
                {product.name}
              </label>
              <hr className="border-third border-1 rounded" />
              <label className="mt-2 text-green-300 font-bold">
                {Currency.format(product.price)}
              </label>
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary">Purchase</button>
            </div>
          </div>
        </div>
      }
    />
  );
}
