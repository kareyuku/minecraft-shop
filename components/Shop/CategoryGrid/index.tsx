import { Server } from "@prisma/client";

import CategoryCard from "./CategoryCard";

export const getServers = async () => {
  const response = await fetch("http://localhost:3000/api/servers");
  const servers = await response.json();
  return servers.data as Server[];
};

export default async function CategoryGrid() {
  const servers = await getServers();
  if (!servers) return <div>loading...</div>;
  return (
    <section className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-3 gap-4">
      {servers.map((server) => (
        <CategoryCard
          name={server.name}
          img={server.imageUri || ""}
          serverId={server.id.toString()}
          key={server.id}
        />
      ))}
    </section>
  );
}
