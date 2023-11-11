"use client";

import { Prisma, Product } from "@prisma/client";
import { useState } from "react";
import ProductsTable from "./ProductsTable";

type ServersProps = Prisma.ServerGetPayload<{
  include: { products: true };
}>;

export default function ProductsGrid({ servers }: { servers: ServersProps[] }) {
  const [servs, setServers] = useState<ServersProps[]>(servers);

  const addProduct = (serverId: number, product: Product) => {
    const copyServs = [...servs];
    copyServs.find((srv) => srv.id === serverId)?.products.push(product);
    setServers(copyServs);
  };

  const removeProduct = (serverId: number, productId: number) => {
    const copyServs = [...servs];
    const server = copyServs.find((srv) => srv.id === serverId);
    setServers(copyServs);
  };

  return (
    <>
      {servs.map((server) => (
        <ProductsTable
          server={server}
          add={addProduct}
          remove={removeProduct}
        />
      ))}
    </>
  );
}
