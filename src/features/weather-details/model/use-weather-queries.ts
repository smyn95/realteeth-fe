import { useSuspenseQueries } from '@tanstack/react-query';
import { type Coordinates, getLocationNameByCoords } from '@/entities/location';
import { fetchWeatherDetails } from '@/entities/open-weather';

type WeatherQueryParams = {
  coordinates: Coordinates;
};

export function useWeatherQueries({ coordinates }: WeatherQueryParams) {
  const [weatherDataQuery, cityQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['weather-details', coordinates.lat, coordinates.lon],
        queryFn: () => fetchWeatherDetails(coordinates.lat, coordinates.lon),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
      },
      {
        queryKey: ['city', coordinates.lat, coordinates.lon],
        queryFn: () => getLocationNameByCoords(coordinates.lat, coordinates.lon),
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60,
      },
    ],
  });

  return {
    weather: weatherDataQuery.data.current,
    forecast: weatherDataQuery.data.daily,
    city: cityQuery.data,
  };
}
