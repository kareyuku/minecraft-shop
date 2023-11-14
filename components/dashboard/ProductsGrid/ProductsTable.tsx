import Modal from "@/components/ui/Modal";
import CreateProductModal from "@/components/modals/CreateProductModal";
import { Prisma } from "@prisma/client";

type ProductsProps = Prisma.ServerGetPayload<{
  include: { products: true };
}>;

interface IProductsTable {
  server: ProductsProps;
  add: Function;
  remove: Function;
}

export default function ProductsTable(props: IProductsTable) {
  const { server, add, remove } = props;
  return (
    <div className="collapse collapse-arrow bg-secondary rounded-md mb-6">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-xl font-medium">{server.name}</div>
      <div className="collapse-content">
        <CreateProductModal serverId={server.id} callback={add} />

        <div className="overflow-x-auto">
          <table className="table bg-background mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>requireOnline</th>
                <th>minimumBuy</th>
                <th>maximumBuy</th>
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
                  <th>
                    <img
                      className="max-h-10 max-w-10"
                      src={product.imageUri || ""}
                    />
                  </th>
                  <th>
                    <Modal
                      btn={"d"}
                      label="Deleting product"
                      request={async () => {
                        const response = await fetch(
                          `/api/servers/${product.serverId}/products/${product.id}`,
                          { method: "DELETE" }
                        );
                        if (response.status === 200)
                          remove(server.id, product.id);
                        return response;
                      }}
                      validation={() => true}
                      style="bright"
                    >
                      Deleting product {product.name}
                    </Modal>
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
