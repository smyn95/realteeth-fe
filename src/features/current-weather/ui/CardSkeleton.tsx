export function CardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-6" aria-hidden="true">
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="rounded-xl bg-[#292d47] p-4 md:rounded-2xl md:p-6">
          <div className="mb-4 h-3 w-24 rounded bg-white/10 md:h-4" />
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-16 w-32 rounded-lg bg-white/10 md:h-20 md:w-48" />
              <div className="h-6 w-24 rounded bg-white/10 md:h-8 md:w-36" />
            </div>
            <div className="size-24 rounded-full bg-white/10 md:size-32" />
          </div>
          <div className="mt-6 h-3 w-40 rounded bg-white/10 md:h-4" />
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex justify-between rounded-xl border border-white/5 bg-[#292d47] p-4 md:aspect-square md:flex-col md:rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-white/10 md:size-12 md:rounded-2xl" />
                <div className="h-4 w-12 rounded bg-white/10" />
              </div>
              <div className="mt-2 h-8 w-16 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#292d47] p-4 md:rounded-2xl md:p-6">
        <div className="mb-6 h-5 w-24 rounded bg-white/10" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 w-full rounded-2xl border border-white/5 bg-white/5 md:h-24" />
          ))}
        </div>
      </div>
    </div>
  );
}
