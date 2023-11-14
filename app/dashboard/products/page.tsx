import ProductsGrid from "@/components/dashboard/ProductsGrid";
import Sidebar from "@/components/ui/Sidebar";
import { prisma } from "@/lib/prisma";
import { Suspense, cache } from "react";

const getServersWithProducts = cache(async () => {
    return await prisma.server.findMany({ include: { products: true } });
});

export default async function AdminProducts() {
    const servers = await getServersWithProducts();
    if (!servers) return <h1>uwu</h1>;
    return (
        <Sidebar>
            <div className="admin__content px-6 py-3">
                <Suspense>
                    <ProductsGrid data={servers} />
                </Suspense>
            </div>
        </Sidebar>
    );
}
