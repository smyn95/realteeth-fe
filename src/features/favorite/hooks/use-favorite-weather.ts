import type { FavoriteLocation } from '@/entities/favorite';
import { fetchWeatherData, type Weather } from '@/entities/open-weather';
import { useSuspenseQueries } from '@tanstack/react-query';

type FavoriteWeather = {
  id: string;
  weather: Weather;
};

export function useFavoriteWeather(favorites: FavoriteLocation[]): FavoriteWeather[] {
  const queries = useSuspenseQueries({
    queries: favorites.map((favorite) => ({
      queryKey: ['favorite-weather', favorite.coordinates.lat, favorite.coordinates.lon],
      queryFn: () => fetchWeatherData(favorite.coordinates.lat, favorite.coordinates.lon),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    })),
  });

  return favorites.map((favorite, index) => ({
    id: favorite.id,
    weather: queries[index].data.current,
  }));
}
