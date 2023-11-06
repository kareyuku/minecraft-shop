import Navbar from "@/components/Navbar";
import ProductsGrid from "@/components/Shop/ProductsGrid";
import { prisma } from "@/lib/prisma";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main className="container mx-auto flex flex-col gap-6 mt-10 px-3 max-sm:px-5">
      <Navbar />
      <ProductsGrid serverId={params.slug} />
    </main>
  );
}
