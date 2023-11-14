"use client";

import { Server } from "@prisma/client";
import { useEffect, useState } from "react";

export default function useServers(data: Server[]) {
  const [servers, setServers] = useState<Server[]>(data);

  const addServer = (server: Server) => setServers([...servers, server]);

  const removeServer = (serverId: string) =>
    setServers(servers.filter((server: Server) => server.id !== serverId));

  const editServer = async (server: Server) => {
    const oldServers = [...servers];
    const index = oldServers.findIndex((serv) => serv.id == server.id);
    oldServers[index] = server;
    setServers([...oldServers]);
  };

  return { servers, addServer, removeServer, editServer };
}
