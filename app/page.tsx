import { Suspense } from "react";
import Layout from "@/components/Shop/Layout";
import CategoryGrid from "@/components/Shop/CategoryGrid";

export default async function LandingPage() {
  return (
    <Layout>
      <h1 className="text-3xl">Choose a Category</h1>
      <Suspense>
        <CategoryGrid />
      </Suspense>
    </Layout>
  );
}
