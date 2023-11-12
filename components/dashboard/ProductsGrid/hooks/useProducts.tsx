"use client";

import { Prisma, Product } from "@prisma/client";
import { useState } from "react";

type ServersProps = Prisma.ServerGetPayload<{
  include: { products: true };
}>;

export default function useProducts(props: ServersProps[]) {
  const [servers, setServers] = useState<ServersProps[]>(props);

  const addProduct = (serverId: number, product: Product) => {
    const copyServs = [...servers];
    copyServs.find((srv) => srv.id === serverId)?.products.push(product);
    setServers(copyServs);
  };

  const removeProduct = (serverId: number, productId: number) => {
    const copyServs = [...servers];
    const server = copyServs.find((srv) => srv.id === serverId);
    setServers(copyServs);
  };

  return { servers, addProduct, removeProduct };
}
