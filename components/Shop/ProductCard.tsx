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
    <div className="p-4">
      <div className="h-full bg-secondary hover:bg-secondary rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={product.imageUri || ""}
          alt="Item"
        />
        <div className="p-3 px-4">
          <h2 className="tracking-widest text-xs title-font font-medium mb-1">
            {product.price}
          </h2>
          <h1 className="title-font tfont-medium mb-3 text-lg">
            {product.name}
          </h1>
          <span className="text-background">{product.description}</span>
          <div className="flex w-full">
            <PurchaseModal product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
