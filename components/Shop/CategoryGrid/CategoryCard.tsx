import Link from "next/link";

type CategoryProps = {
  name: string;
  img?: string;
  serverId: string;
};

export default function CategoryCard({ name, img, serverId }: CategoryProps) {
  return (
    <Link
      href={`/category/${serverId}`}
      className="bg-secondary h-60 flex flex-col items-center p-5 rounded-md hover:bg-third transition-colors cursor-pointer"
      style={{
        backgroundImage: `url('${img}')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <img
                style={{ height: 150, width: 150 }}
                className="object-contain"
                src={img || ""}
                alt="Product"
            /> */}
      <label className="text-lg mt-1">{name}</label>
    </Link>
  );
}
