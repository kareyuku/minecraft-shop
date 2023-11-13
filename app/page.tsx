import Navbar from "@/components/ui/Navbar";
import CategoryCard from "@/components/Shop/CategoryCard";
import RecentPurchases from "@/components/Shop/Modules/RecentPurchases";
import { prisma } from "@/lib/prisma";
import { Suspense, cache } from "react";

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
            <section className="flex flex-col gap-10">
                <h1 className="text-2xl">Choose a Category</h1>
                <section className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-3 gap-4">
                    <Suspense fallback={<h1>Loading..</h1>}>
                        {servers.map((server) => (
                            <CategoryCard
                                name={server.name}
                                img={server.imageUri || ""}
                                serverId={server.id.toString()}
                                key={server.id}
                            />
                        ))}
                    </Suspense>
                </section>
            </section>
        </main>
    );
}
