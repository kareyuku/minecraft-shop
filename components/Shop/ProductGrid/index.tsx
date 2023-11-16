import ProductCard from "@/components/Shop/ProductGrid/ProductCard";
import { PaymentMethod, Product } from "@prisma/client";

interface IProductGridProps {
  products: Product[];
  payments: PaymentMethod[];
}

export default async function ProductGrid(props: IProductGridProps) {
  const { products, payments } = props;
  return (
    <section className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          product={product}
          paymentsMethods={payments}
          key={product.id}
        />
      ))}
    </section>
  );
}
