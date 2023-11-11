import Navbar from "@/components/ui/Navbar";
import CategoryCard from "@/components/Shop/CategoryCard";
import RecentPurchases from "@/components/Shop/Modules/RecentPurchases";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const revalidate = 3600;

export const getServers = cache(async () => {
  const servers = await prisma.server.findMany();
  return servers;
});

export default async function LandingPage() {
  const servers = await getServers();
  return (
    <main className="container mx-auto flex flex-col gap-6 mt-10 px-3 max-sm:px-5">
      <Navbar />
      <section className="flex max-sm:flex-col gap-10">
        <section className="flex-[0.7] grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 gap-4">
          {servers.map((server) => (
            <CategoryCard
              name={server.name}
              img={server.imageUri || ""}
              serverId={server.id.toString()}
              key={server.id}
            />
          ))}
        </section>
        <section className="flex-[0.3]">
          <RecentPurchases />
        </section>
      </section>
    </main>
  );
}
