"use client";
import CreateProductModal from "@/components/modals/CreateProductModal";
import { Product, Server } from "@prisma/client";

export default function ProductsGrid({
  servers,
  products,
}: {
  servers: Server[];
  products: Product[];
}) {
  if (!servers) return <h1>loading</h1>;
  return (
    <h1>
      <CreateProductModal callback={() => {}} servers={servers} />
      <div className="overflow-auto max-w-screen max-w-full">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </h1>
  );
}
