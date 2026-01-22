import { useSuspenseQueries } from '@tanstack/react-query';
import { type Coordinates, getLocationNameByCoords } from '@/entities/location';
import { fetchWeatherData } from '@/entities/open-weather';

type WeatherQueryParams = {
  coordinates: Coordinates;
  locationName: string | null;
};

export function useWeatherQueries({ coordinates, locationName }: WeatherQueryParams) {
  const [weatherDataQuery, cityQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['weather', coordinates.lat, coordinates.lon],
        queryFn: () => fetchWeatherData(coordinates.lat, coordinates.lon),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
      },
      {
        queryKey: ['city', coordinates.lat, coordinates.lon, locationName],
        queryFn: () => (locationName ? locationName : getLocationNameByCoords(coordinates.lat, coordinates.lon)),
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60,
      },
    ],
  });

  return {
    weather: weatherDataQuery.data.current,
    forecast: weatherDataQuery.data.daily,
    hourly: weatherDataQuery.data.hourly,
    city: cityQuery.data,
  };
}
