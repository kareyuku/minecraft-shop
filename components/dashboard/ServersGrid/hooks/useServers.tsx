"use client";

import { Server } from "@prisma/client";
import { useEffect, useState } from "react";

export default function useServers() {
  const [servers, setServers] = useState<Server[]>([]);

  const fetchServers = async () => {
    const response = await fetch("/api/servers");
    setServers(await response.json());
  };

  const addServer = (server: Server) => setServers([...servers, server]);

  const removeServer = (serverId: string) =>
    setServers(servers.filter((server: Server) => server.id !== serverId));

  const editServer = async (server: Server) => {
    const oldServers = [...servers];
    const index = oldServers.findIndex((serv) => serv.id == server.id);
    oldServers[index] = server;
    setServers([...oldServers]);
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return { servers, addServer, removeServer, editServer };
}
