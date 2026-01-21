import type { Coordinates } from '@/entities/location';
import { WeatherForecast, useWeatherQueries } from '@/features/current-weather';
import { WeatherDisplay } from './WeatherDisplay';

type Props = {
  coordinates: Coordinates;
};

export function WeatherLayout({ coordinates }: Props) {
  const { weather, forecast, city } = useWeatherQueries({ coordinates });

  return (
    <article className="flex flex-col gap-6">
      <WeatherDisplay weather={weather} city={city} />
      <WeatherForecast forecast={forecast} />
    </article>
  );
}
