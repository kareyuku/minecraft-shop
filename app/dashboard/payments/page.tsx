import Sidebar from "@/components/ui/Sidebar";
import PaymentsGrid from "@/components/dashboard/PaymentsGrid/PaymentsGrid";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

export default async function AdminProducts() {
  const servers = await prisma.server.findMany({
    include: { products: true },
  });

  return (
    <Sidebar>
      <div className="admin__content px-6 py-3">
        <Suspense>
          <PaymentsGrid />
        </Suspense>
      </div>
    </Sidebar>
  );
}
