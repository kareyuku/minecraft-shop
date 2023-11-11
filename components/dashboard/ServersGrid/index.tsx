"use client";

import ServerCard from "./ServerCard";
import { useEffect, useState } from "react";
import { Server } from "@prisma/client";
import CreateServerModal from "@/components/Modals/CreateServerModal";

export default function ServersGrid() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);

  const loadServers = async () => {
    const data = await fetch("/api/servers");
    setServers(await data.json());
    setLoading(false);
  };

  const addServer = (server: Server) => setServers([...servers, server]);

  const removeServer = (serverId: number) =>
    setServers(servers.filter((server: Server) => server.id !== serverId));

  const editServer = async (server: Server) => {
    const oldServers = [...servers];
    const index = oldServers.findIndex((serv) => serv.id == server.id);
    oldServers[index] = server;
    setServers([...oldServers]);
  };

  useEffect(() => {
    loadServers();
  }, []);

  if (loading) return "Loading";

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
