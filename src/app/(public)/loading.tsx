export default function Loading() {
  return (
    <div className="flex animate-pulse flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="h-10 w-64 rounded-lg bg-white/10" />
        <div className="h-4 w-96 max-w-full rounded bg-white/5" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="glass overflow-hidden rounded-2xl">
            <div className="aspect-[1.9/1] w-full bg-white/5" />
            <div className="flex flex-col gap-3 p-6">
              <div className="h-3 w-24 rounded bg-white/5" />
              <div className="h-5 w-3/4 rounded bg-white/10" />
              <div className="h-4 w-full rounded bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
