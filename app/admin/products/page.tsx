import CreateProductModal from "@/components/Modals/CreateProductModal";
import Sidebar from "@/components/Sidebar";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type ServerWithProducts = Prisma.ServerGetPayload<{
  include: { products: true };
}>;

export default async function AdminProducts() {
  const Servers = await prisma.server.findMany({ include: { products: true } });

  function ServerContent({ server }: { server: ServerWithProducts }) {
    return (
      <div className="collapse collapse-arrow bg-secondary mb-6">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">{server.name}</div>
        <div className="collapse-content overflow-x-auto">
          <CreateProductModal serverId={server.id} />
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>requireOnline</th>
                  <th>minimumBuy</th>
                  <th>maximumBuy</th>
                  <th>serverId</th>
                  <th>imageUri</th>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {server.products.map((product) => (
                  <tr key={product.description}>
                    <th>{product.id}</th>
                    <th>{product.name}</th>
                    <th>{product.price}</th>
                    <th className="max-w-[150px]">{product.description}</th>
                    <th>{product.requireOnline.toString()}</th>
                    <th>{product.minimumBuy}</th>
                    <th>{product.maximumBuy}</th>
                    <th>{product.serverId}</th>
                    <th>
                      <img
                        className="max-h-10 max-w-10"
                        src={product.imageUri || ""}
                      />
                    </th>
                    <th>
                      <button className="btn">d</button>
                    </th>
                    <th>
                      <button className="btn">m</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Sidebar>
      <div className="admin__content px-6 py-3">
        <h1 className="mb-10">Servers</h1>
        {Servers.map((server) => (
          <ServerContent server={server} />
        ))}
      </div>
    </Sidebar>
  );
}
