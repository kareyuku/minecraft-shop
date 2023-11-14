import { Suspense } from "react";
import Layout from "@/components/Shop/Layout";
import CategoryGrid from "@/components/Shop/CategoryGrid";

export const revalidate = 3600;

export default async function LandingPage() {
  return (
    <Layout>
      <section className="flex flex-col gap-10">
        <h1 className="text-3xl">Choose a Category</h1>
        <Suspense>
          <CategoryGrid />
        </Suspense>
      </section>
    </Layout>
  );
}
