import { Suspense } from "react";
import { HiMiniArrowUpOnSquareStack } from "react-icons/hi2";

import RecentPurchases from "@/components/Shop/Modules/RecentPurchases";
import Layout from "@/components/Shop/Layout";
import ProductGrid from "@/components/Shop/ProductGrid";

type params = {
  params: {
    slug: string;
  };
};

export async function getCategory(slug: string) {
  const response = await fetch(`http://localhost:3000/api/servers/${slug}`);
  const data = await response.json();
  return data?.data;
}

export default async function CategoryPage({ params }: params) {
  const data = await getCategory(params.slug);
  return (
    <Layout>
      <div className="flex items-center gap-2 text-3xl text-third">
        <HiMiniArrowUpOnSquareStack />
        <h1 className="text-third">{data.server?.name}</h1>
      </div>
      <Suspense>
        {/* TODO: Instead of giving slug, pass a products from server variable */}
        <ProductGrid products={data.server.products} payments={data.payments} />
        <RecentPurchases />
      </Suspense>
    </Layout>
  );
}
