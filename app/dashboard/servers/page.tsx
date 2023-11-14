import { Suspense } from "react";

import Sidebar from "@/components/ui/Sidebar";
import ServersGrid from "@/components/dashboard/ServersGrid";

export async function getServers() {
  const response = await fetch("http://localhost:3000/api/servers");
  const data = await response.json();
  return data?.data;
}

export default async function Servers() {
  const servers = await getServers();
  return (
    <Sidebar>
      <div className="admin__content px-6 py-3">
        <Suspense>
          <ServersGrid data={servers} />
        </Suspense>
      </div>
    </Sidebar>
  );
}
