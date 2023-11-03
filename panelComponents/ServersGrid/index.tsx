import { prisma } from "@/lib/prisma";
import CreateServerModal from "@/modals/CreateServerModal";
import ServerCard from "./ServerCard.tsx";

export default async function ServersGrid() {
  const Servers = await prisma.server.findMany();

  return (
    <>
      <CreateServerModal />
      <section className="flex-[0.7] grid max-sm:grid-cols-1 grid-cols-2 gap-4 mt-5">
        {Servers.map((server) => (
          <ServerCard server={server} />
        ))}
      </section>
    </>
  );
}
