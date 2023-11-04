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
      className="card bg-secondary p-10 rounded-md hover:bg-third transition-colors text-center flex items-center flex-col"
    >
      <img className="rounded-md" width={100} height={100} src={img} />
      <label>{name}</label>
    </Link>
  );
}
