"use client";

import { Prisma } from "@prisma/client";
import { useState, useEffect } from "react";
import ProductsTable from "./ProductsTable";

type ServersProps = Prisma.ServerGetPayload<{
  include: { products: true };
}>;

export default function ProductsGrid({ servers }: { servers: ServersProps[] }) {
  const [servs, setServers] = useState<ServersProps[]>(servers);

  return (
    <>
      {servs.map((server) => (
        <ProductsTable
          id={server.id}
          imageUri={server.imageUri}
          ip={server.ip}
          name={server.name}
          products={server.products}
        />
      ))}
    </>
  );
}
