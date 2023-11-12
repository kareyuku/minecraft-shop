export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#EEEADB] text-[#222222] p-8 px-12">
      <div className="flex border-black border-2 p-4 rounded justify-around">
        <span>home</span>
        <span>docs</span>
        <span>pricing</span>
        <span>blog</span>
      </div>
      <article className="flex flex-1">
        <section className="flex gap-3 flex-col flex-[0.7] justify-end">
          <h1 className="text-9xl font-bold">szopiku</h1>
          <p className="text-4xl">best itemshop for you minecraft server</p>
          <button className="btn btn-outline text-black border-black border-2 mt-12 py-4">
            start now
          </button>
        </section>
        <section className="flex-1"></section>
      </article>
    </main>
  );
}
