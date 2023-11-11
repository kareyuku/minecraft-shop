import Navbar from "@/components/ui/Navbar";
import RecentPurchases from "@/components/Shop/Modules/RecentPurchases";
import ProductCard from "@/components/Shop/ProductCard";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

type params = {
  params: {
    slug: string;
  };
};

export const getProducts = cache(async (serverId: number) => {
  const products = await prisma.product.findMany({ where: { serverId } });
  const payments = await prisma.paymentMethod.findMany({
    distinct: ["currency", "fee", "id", "provider"],
  });
  return { products, payments };
});

export default async function CategoryPage({ params }: params) {
  const { products, payments } = await getProducts(parseInt(params.slug));
  return (
    <main className="container mx-auto flex flex-col gap-6 mt-10 px-3 max-sm:px-5">
      <Navbar />
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
    </main>
  );
}
