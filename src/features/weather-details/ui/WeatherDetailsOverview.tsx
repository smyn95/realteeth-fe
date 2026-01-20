import { Droplets, MapPin, Thermometer, Wind } from 'lucide-react';

export function WeatherDetailsOverview() {
  return (
    <article className="flex flex-col gap-8 py-10 text-white">
      <section className="flex flex-col items-center md:gap-6">
        <div className="flex items-center gap-2 text-lg text-white/90 md:text-xl">
          <MapPin className="size-5" aria-hidden="true" />
          <span className="font-medium">현재 위치</span>
        </div>

        <div className="relative">
          <img src="" className="size-32 object-contain md:size-48" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-8xl font-extralight tracking-tighter md:text-9xl">temperature°</p>
          <p className="mt-2 text-xl font-light text-white/80 md:text-2xl">description</p>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-white/70 md:text-base">
          <div className="flex gap-2">
            <span>최고</span>
            <span className="font-medium text-white">tempMax°</span>
          </div>
          <div className="h-3 w-[1px] bg-white/30" />
          <div className="flex gap-2">
            <span>최저</span>
            <span className="font-medium text-white">tempMin°</span>
          </div>
        </div>
      </section>

      <ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        <WeatherInfoItem icon={<Thermometer className="size-5 md:size-6" />} label="체감 온도" value="-13" />
        <WeatherInfoItem icon={<Droplets className="size-5 md:size-6" />} label="습도" value="27%" />
        <WeatherInfoItem icon={<Wind className="size-5 md:size-6" />} label="풍속" value="1.4 m/s" />
      </ul>
    </article>
  );
}

function WeatherInfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:flex-col md:gap-4">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white/10 p-2 text-blue-300">{icon}</div>
        <span className="text-sm text-white/60">{label}</span>
      </div>
      <span className="text-xl font-semibold">{value}</span>
    </li>
  );
}
