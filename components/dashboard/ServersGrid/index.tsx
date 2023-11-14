"use client";

import ServerCard from "./ServerCard";
import CreateServerModal from "@/components/modals/CreateServerModal";
import useServers from "./hooks/useServers";
import { Server } from "@prisma/client";

export default function ServersGrid({ data }: { data: Server[] }) {
  const { servers, addServer, editServer, removeServer } = useServers(data);

  return (
    <>
      <CreateServerModal addServer={addServer} />
      <section className="grid grid-cols-1 gap-4 mt-5 mx-auto">
        {servers.map((server) => (
          <ServerCard
            server={server}
            key={server.id}
            removeServer={removeServer}
            editServer={editServer}
          />
        ))}
      </section>
    </>
  );
}
