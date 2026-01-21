import type { Coordinates } from '@/entities/location';
import { Forecast, useWeatherQueries } from '@/features/weather-details';
import { WeatherDetailsOverview } from './WeatherDetailsOverview';

type Props = {
  coordinates: Coordinates;
};

export function WeatherDetails({ coordinates }: Props) {
  const { weather, forecast, city } = useWeatherQueries({ coordinates });

  return (
    <article className="flex flex-col gap-6">
      <WeatherDetailsOverview weather={weather} city={city} />
      <Forecast forecast={forecast} />
    </article>
  );
}
