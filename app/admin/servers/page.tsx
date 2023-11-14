import { Suspense } from "react";

import Sidebar from "@/components/ui/Sidebar";
import ServersGrid from "@/components/dashboard/ServersGrid";

export default async function Servers() {
  return (
    <Sidebar>
      <div className="admin__content px-6 py-3">
        <Suspense>
          <ServersGrid />
        </Suspense>
      </div>
    </Sidebar>
  );
}
