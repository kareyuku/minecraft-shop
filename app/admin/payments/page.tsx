import ProductsGrid from "@/components/dashboard/ProductsGrid";
import CreatePaymentMethod from "@/components/Modals/CreatePaymentMethod";
import Sidebar from "@/components/Sidebar";
import PaymentOption from "@/components/dashboard/PaymentsGrid/PaymentOption";
import PaymentsGrid from "@/components/dashboard/PaymentsGrid/PaymentsGrid";
import { prisma } from "@/lib/prisma";

export default async function AdminProducts() {
  const servers = await prisma.server.findMany({ include: { products: true } });

  return (
    <Sidebar>
      <div className="admin__content px-6 py-3">
        <CreatePaymentMethod />
        <PaymentsGrid />
      </div>
    </Sidebar>
  );
}
