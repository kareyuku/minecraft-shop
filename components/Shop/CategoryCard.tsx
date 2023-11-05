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
      className="card bg-secondary py-5 rounded-md hover:bg-base-300 transition-colors text-center flex items-center flex-col"
    >
      <label className="text-xl mb-4">{name}</label>

      <img className="rounded-md" width={100} height={100} src={img} />
    </Link>
  );
}
