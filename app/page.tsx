import CategoryCard from "@/components/CategoryCard";
import Navbar from "@/components/Navbar";
import RecentPucharses from "@/components/RecentPucharses";

export default function LandingPage() {
  return (
    <main className="container mx-auto flex flex-col gap-6 mt-10 px-3 max-sm:px-5">
      <Navbar />
      <section className="flex max-sm:flex-col gap-10">
        <section className="flex-[0.7] grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 gap-4">
          <CategoryCard
            name={"Survival"}
            img={"https://i.imgur.com/zjAx5dG.png"}
          />
          <CategoryCard
            name={"Survival"}
            img={"https://i.imgur.com/zjAx5dG.png"}
          />
          <CategoryCard
            name={"Survival"}
            img={"https://i.imgur.com/zjAx5dG.png"}
          />
          <CategoryCard
            name={"Survival"}
            img={"https://i.imgur.com/zjAx5dG.png"}
          />
        </section>
        <section className="flex-[0.3]">
          <RecentPucharses />
        </section>
      </section>
    </main>
  );
}
