export default function RecentPurchases() {
  return (
    <>
      <h1 className="text-2xl">Recent Purchases</h1>
      <div className="flex flex-wrap gap-3">
        <div className="bg-secondary p-5 rounded">
          <img
            width={80}
            height={80}
            src={"https://minotar.net/avatar/Miurci/100"}
            className="rounded-md"
          />
        </div>
      </div>
    </>
  );
}
