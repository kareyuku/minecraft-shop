"use client";

import { useEffect, useState } from "react";
import RecentPurchases from "./Modules/RecentPurchases";
import ProductCard from "./ProductCard";
import { PaymentMethod, Product } from "@prisma/client";

export default function ProductsGrid({ serverId }: { serverId: string }) {
  const [payments, setPayments] = useState<PaymentMethod[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const request = await fetch(`/api/servers/${serverId}/products`);
    const data = await request.json();
    setPayments(data.paymentsMethods);
    setProducts(data.products);
    setLoading(false);
    return data;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <></>;

  return (
    <section className="flex max-sm:flex-col gap-10">
      <section className="flex-[0.7] grid max-sm:grid-cols-2 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            product={product}
            paymentsMethods={payments}
            key={product.id}
          />
        ))}
      </section>
      <section className="flex-[0.3]">
        <RecentPurchases />
      </section>
    </section>
  );
}
