import RecentPurchases from "@/components/Shop/Modules/RecentPurchases";
import Layout from "@/components/Shop/Layout";
import ProductGrid from "@/components/Shop/ProductGrid";
import { Suspense } from "react";

type params = {
  params: {
    slug: string;
  };
};

export default async function CategoryPage({ params }: params) {
  return (
    <Layout>
      <h1 className="text-2xl">Category: Survival</h1>
      <Suspense>
        <ProductGrid slug={params.slug} />
        <RecentPurchases />
      </Suspense>
    </Layout>
  );
}
