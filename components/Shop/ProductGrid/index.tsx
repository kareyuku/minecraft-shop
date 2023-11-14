import { prisma } from "@/lib/prisma";
import { cache } from "react";

import ProductCard from "@/components/Shop/ProductGrid/ProductCard";

export const getProducts = cache(async (serverId: string) => {
  const products = await prisma.product.findMany({ where: { serverId } });
  const payments = (await prisma.paymentMethod.findMany({
    distinct: ["fee", "provider"],
  })) as any;
  return { products, payments };
});

export default async function ProductGrid({ slug }: { slug: string }) {
  const { products, payments } = await getProducts(slug);

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
