import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import RecentPurchases from "@/components/RecentPurchases";
import { prisma } from "@/lib/prisma";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const Products = await prisma.product.findMany({
    where: { serverId: Number.parseInt(params.slug as string) },
    include: { paymentMethods: true },
  });

  return (
    <main className="container mx-auto flex flex-col gap-6 mt-10 px-3 max-sm:px-5">
      <Navbar />
      <section className="flex max-sm:flex-col gap-10">
        <section className="flex-[0.7] grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 gap-4">
          {Products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </section>
        <section className="flex-[0.3]">
          <RecentPurchases />
        </section>
      </section>
    </main>
  );
}
