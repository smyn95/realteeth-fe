import { WeatherDetailsOverview } from './WeatherDetailsOverview';

export function WeatherDetails() {
  return (
    <article className="flex flex-col gap-6">
      <WeatherDetailsOverview />
      <Forecast />
    </article>
  );
}
