import Sidebar from "@/components/ui/Sidebar";
import PaymentsGrid from "@/components/dashboard/PaymentsGrid/PaymentsGrid";
import { Suspense } from "react";

export async function getPayments() {
  const response = await fetch("http://localhost:3000/api/payments");
  const data = await response.json();
  return data;
}

export default async function AdminProducts() {
  const payments = await getPayments();
  return (
    <Sidebar>
      <div className="admin__content px-6 py-3">
        <Suspense>
          <PaymentsGrid data={payments} />
        </Suspense>
      </div>
    </Sidebar>
  );
}
