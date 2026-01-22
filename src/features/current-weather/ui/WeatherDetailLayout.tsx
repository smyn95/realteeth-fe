import type { Coordinates } from '@/entities/location';
import { useWeatherQueries } from '@/features/current-weather';
import { WeatherDisplay } from './WeatherDisplay';
import { WeatherForecastDetail } from './WeatherForecastDetail';

type Props = {
  coordinates: Coordinates;
  locationName?: string;
};

export function WeatherDetailLayout({ coordinates, locationName }: Props) {
  const { weather, forecast, hourly, city } = useWeatherQueries({ coordinates, locationName: locationName ?? null });

  return (
    <article className="flex flex-col gap-6">
      <WeatherDisplay weather={weather} city={city} coordinates={coordinates} />
      <WeatherForecastDetail forecast={forecast} hourly={hourly} />
    </article>
  );
}
