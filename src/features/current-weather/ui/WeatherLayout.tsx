import type { Coordinates } from '@/entities/location';
import { WeatherForecast, useWeatherQueries } from '@/features/current-weather';
import { useLocationStore } from '@/shared';
import { WeatherDisplay } from './WeatherDisplay';

type Props = {
  coordinates: Coordinates;
  locationName?: string;
};

export function WeatherLayout({ coordinates, locationName: propsLocationName }: Props) {
  const { locationName: storeLocationName } = useLocationStore();
  const locationName = propsLocationName ?? storeLocationName;
  const { weather, forecast, city } = useWeatherQueries({ coordinates, locationName });

  return (
    <article className="flex flex-col gap-6">
      <WeatherDisplay weather={weather} city={city} coordinates={coordinates} />
      <WeatherForecast forecast={forecast} />
    </article>
  );
}
