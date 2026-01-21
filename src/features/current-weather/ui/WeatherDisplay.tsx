import {
  formatHumidity,
  formatTemperature,
  formatTime,
  formatWindSpeed,
  getUviLevel,
  getWeatherIconUrl,
  type Weather,
} from '@/entities/open-weather';
import { Droplets, MapPin, Sun, Sunrise, Sunset, Thermometer, Wind } from 'lucide-react';

type Props = {
  weather: Weather;
  city: string;
};

export function WeatherDisplay(props: Props) {
  const { weather, city } = props;
  const { description, icon, temperature, feelsLike, humidity, windSpeed, tempMin, tempMax, uvi, sunrise, sunset } = weather;

  return (
    <article className="flex flex-col gap-8 py-10 text-white">
      <section className="flex flex-col items-center md:gap-6">
        <div className="flex items-center gap-2 text-lg text-white/90 md:text-xl">
          <MapPin className="size-5" aria-hidden="true" />
          <span className="font-medium">{city}</span>
        </div>

        <div className="relative">
          <img
            src={getWeatherIconUrl(icon)}
            alt={description}
            className="size-32 object-contain md:size-48"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-8xl font-extralight tracking-tighter md:text-9xl">{Math.round(temperature)}°</p>
          <p className="mt-2 text-xl font-light text-white/80 md:text-2xl">{description}</p>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-white/70 md:text-base">
          <div className="flex gap-2">
            <span>최고</span>
            <span className="font-medium text-white">{Math.round(tempMax)}°</span>
          </div>
          <div className="h-3 w-[1px] bg-white/30" />
          <div className="flex gap-2">
            <span>최저</span>
            <span className="font-medium text-white">{Math.round(tempMin)}°</span>
          </div>
        </div>
      </section>

      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        <WeatherInfoItem icon={<Thermometer className="size-5 md:size-6" />} label="체감 온도" value={formatTemperature(feelsLike)} />
        <WeatherInfoItem icon={<Droplets className="size-5 md:size-6" />} label="습도" value={formatHumidity(humidity)} />
        <WeatherInfoItem icon={<Wind className="size-5 md:size-6" />} label="풍속" value={formatWindSpeed(windSpeed)} />
        <WeatherInfoItem icon={<Sun className="size-5 md:size-6" />} label="UV 지수" value={`${Math.round(uvi)} ${getUviLevel(uvi)}`} />
        <WeatherInfoItem icon={<Sunrise className="size-5 md:size-6" />} label="일출" value={formatTime(sunrise)} />
        <WeatherInfoItem icon={<Sunset className="size-5 md:size-6" />} label="일몰" value={formatTime(sunset)} />
      </ul>
    </article>
  );
}

function WeatherInfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:gap-4">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white/10 p-2 text-blue-300">{icon}</div>
        <span className="text-sm text-white/60">{label}</span>
      </div>
      <span className="text-xl font-semibold">{value}</span>
    </li>
  );
}
