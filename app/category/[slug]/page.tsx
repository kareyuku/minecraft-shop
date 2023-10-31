import { PaymentProvider } from "@prisma/client";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import RecentPucharses from "@/components/RecentPucharses";

const Products = [
  {
    name: "Skrzynia Skarbów",
    price: 5.0,
    img: "https://media.sketchfab.com/models/020c3726d3c648f88c70a555fdb85764/thumbnails/d526a9af9a6b4bfe8471faf0907f9448/ace427efa47b4903a1762a98b47352b7.jpeg",
  },
  {
    name: "Rzadki Klucz",
    price: 5.0,
    img: "https://cdn.discordapp.com/attachments/974758519268065351/990972480632025178/unknown.png",
  },
  {
    name: "Porsche",
    price: 9123021903.0,
    img: "https://tor-lodz.pl/frontend/images/supercars/porsche-911-tor-lodz-3_152bee2ebcb640b15ed56bd0097818e4d8a691ce.jpg",
  },
];

export default function CategoryPage() {
  return (
    <main className="container mx-auto flex flex-col gap-6 mt-10 px-3 max-sm:px-5">
      <Navbar />
      <section className="flex max-sm:flex-col gap-10">
        <section className="flex-[0.7] grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 gap-4">
          {Products.map((product) => (
            <ProductCard
              name={product.name}
              price={product.price}
              img={product.img}
            />
          ))}
        </section>
        <section className="flex-[0.3]">
          <RecentPucharses />
        </section>
      </section>
    </main>
  );
}
