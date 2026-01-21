import { Button } from '@/components/ui/button';
import type { Coordinates } from '@/entities/location';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useFavoriteActions } from '../hooks/use-favorite-actions';

type Props = {
  coordinates: Coordinates;
  locationName: string;
};

export function AddFavoriteButton({ coordinates, locationName }: Props) {
  const { handleAdd, handleRemove, isFavorite, favorites } = useFavoriteActions();

  const isCurrentFavorite = isFavorite(coordinates.lat, coordinates.lon);

  const handleClick = () => {
    if (isCurrentFavorite) {
      const favorite = favorites.find((f) => f.coordinates.lat === coordinates.lat && f.coordinates.lon === coordinates.lon);

      if (favorite) {
        handleRemove(favorite.id);
      }
      return;
    }

    const result = handleAdd(coordinates, locationName);
    if (!result.success && result.error) {
      alert(result.error);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={cn(
        'rounded-full p-2 transition-all duration-300',
        isCurrentFavorite
          ? 'bg-yellow-100 text-yellow-500 hover:bg-yellow-200'
          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white',
      )}
    >
      <Star className={cn('size-5 transition-transform active:scale-90', isCurrentFavorite && 'fill-current')} />
    </Button>
  );
}
