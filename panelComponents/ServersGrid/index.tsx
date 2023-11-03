"use client";

import CreateServerModal from "@/modals/CreateServerModal";
import ServerCard from "./ServerCard.tsx";
import { useEffect, useState } from "react";
import { Server } from "@prisma/client";

export default function ServersGrid() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);

  const loadServers = async () => {
    const data = await fetch("/api/servers");
    setServers(await data.json());
    setLoading(false);
  };

  useEffect(() => {
    loadServers();
  }, []);

  if (loading) return "Loading";

  const addServer = (server: Server) => setServers([...servers, server]);

  const removeServer = (serverId: number) => {
    setServers(servers.filter((server: Server) => server.id !== serverId));
  };

  return (
    <>
      <CreateServerModal addServer={addServer} />
      <section className="flex-[0.7] grid max-sm:grid-cols-1 grid-cols-2 gap-4 mt-5">
        {servers.map((server) => (
          <ServerCard
            server={server}
            key={server.id}
            removeServer={removeServer}
          />
        ))}
      </section>
    </>
  );
}
