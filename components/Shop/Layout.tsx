import Navbar from "../ui/Navbar";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto flex flex-col gap-6 mt-10 px-3 max-sm:px-5">
      <Navbar />
      <section className="flex flex-col gap-10">
        <Suspense>{children}</Suspense>
      </section>
    </main>
  );
}
