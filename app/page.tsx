import { Suspense } from "react";
import { BiSolidCategory } from "react-icons/bi";

import Layout from "@/components/Shop/Layout";
import CategoryGrid from "@/components/Shop/CategoryGrid";

export default async function LandingPage() {
  return (
    <Layout>
      <div className="flex items-center gap-2 text-3xl text-third">
        <BiSolidCategory />
        <h1 className="text-white">Choose a Category</h1>
      </div>
      <Suspense>
        <CategoryGrid />
      </Suspense>
    </Layout>
  );
}
