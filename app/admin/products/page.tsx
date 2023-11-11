import ProductsGrid from "@/components/dashboard/ProductsGrid";
import Sidebar from "@/components/ui/Sidebar";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getServersWithProducts = cache(async () => {
  return await prisma.server.findMany({ include: { products: true } });
});

export default async function AdminProducts() {
  const servers = await getServersWithProducts();
  return (
    <Sidebar>
      <div className="admin__content px-6 py-3">
        <ProductsGrid servers={servers} />
      </div>
    </Sidebar>
  );
}
