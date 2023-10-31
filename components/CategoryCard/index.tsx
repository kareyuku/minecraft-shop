type CategoryProps = {
  name: string;
  img?: string;
};

export default function CategoryCard({ name, img }: CategoryProps) {
  return (
    <div className="card bg-secondary p-10 rounded-md hover:bg-third transition-colors text-center flex items-center flex-col">
      <img className="rounded-md" width={100} height={100} src={img} />
      <label>{name}</label>
    </div>
  );
}
