"use client";

import { Prisma } from "@prisma/client";
import ProductsTable from "./ProductsTable";
import useProducts from "./hooks/useProducts";

type ServersProps = Prisma.ServerGetPayload<{
  include: { products: true };
}>;

export default function ProductsGrid({ data }: { data: ServersProps[] }) {
  const { servers, addProduct, removeProduct } = useProducts(data);

  return (
    <>
      {servers.map((server) => (
        <ProductsTable
          server={server}
          add={addProduct}
          remove={removeProduct}
        />
      ))}
    </>
  );
}
