import ProductsGrid from "@/components/dashboard/ProductsGrid";
import Sidebar from "@/components/ui/Sidebar";

export async function getServers() {
  const response = await fetch(`http://localhost:3000/api/servers`);
  const data = await response.json();
  return data?.data;
}

export async function getProducts() {
  const response = await fetch(`http://localhost:3000/api/products`);
  const data = await response.json();
  return data.products;
}

export default async function DashboardProducts() {
  const servers = await getServers();
  const products = await getProducts();

  return (
    <Sidebar>
      <div className="admin__content px-6 py-3 flex flex-col">
        <ProductsGrid servers={servers} products={products} />
      </div>
    </Sidebar>
  );
}
