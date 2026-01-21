import type { Coordinates } from '@/entities/location';
import { WeatherForecast, useWeatherQueries } from '@/features/current-weather';
import { useLocationStore } from '@/shared';
import { WeatherDisplay } from './WeatherDisplay';

type Props = {
  coordinates: Coordinates;
};

export function WeatherLayout({ coordinates }: Props) {
  const { locationName } = useLocationStore();
  const { weather, forecast, city } = useWeatherQueries({ coordinates, locationName });

  return (
    <article className="flex flex-col gap-6">
      <WeatherDisplay weather={weather} city={city} coordinates={coordinates} />
      <WeatherForecast forecast={forecast} />
    </article>
  );
}
