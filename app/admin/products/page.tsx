import ProductsGrid from "@/components/AdminDashboard/ProductsGrid";
import CreateProductModal from "@/components/Modals/CreateProductModal";
import Sidebar from "@/components/Sidebar";
import { prisma } from "@/lib/prisma";

export default async function AdminProducts() {
  const servers = await prisma.server.findMany({ include: { products: true } });

  return (
    <Sidebar>
      <div className="admin__content px-6 py-3">
        <ProductsGrid servers={servers} />
      </div>
    </Sidebar>
  );
}
