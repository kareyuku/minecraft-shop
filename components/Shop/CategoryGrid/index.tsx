import { cache } from "react";
import { Server } from "@prisma/client";

import CategoryCard from "./CategoryCard";

export const getServers = cache(async () => {
  const response = await fetch("http://localhost:3000/api/servers");
  return (await response.json()) as Server[];
});

export default async function CategoryGrid() {
  const servers = await getServers();
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
