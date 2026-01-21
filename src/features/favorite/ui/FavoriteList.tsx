import { Badge } from '@/components/ui/badge';
import type { FavoriteLocation } from '@/entities/favorite';
import { MAX_FAVORITES } from '@/entities/favorite';
import { useLocationStore } from '@/shared/store/location-store';
import { Star } from 'lucide-react';
import { Suspense, useState } from 'react';
import { useFavoriteActions } from '../hooks/use-favorite-actions';
import { useFavoriteWeather } from '../hooks/use-favorite-weather';
import { EditNameModal } from './EditNameModal';
import { FavoriteCard } from './FavoriteCard';
import { FavoriteListSkeleton } from './FavoriteListSkeleton';

export function FavoriteList() {
  const { favorites, handleRemove, handleUpdateName } = useFavoriteActions();
  const [editingFavorite, setEditingFavorite] = useState<FavoriteLocation | null>(null);

  const isFull = favorites.length >= MAX_FAVORITES;

  const handleSaveName = (name: string) => {
    if (!editingFavorite) return { success: false, error: '수정할 항목이 없습니다.' };
    return handleUpdateName(editingFavorite.id, name);
  };

  return (
    <section aria-labelledby="favorites-title" className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Star className="size-4 fill-current" aria-hidden="true" />
          </div>
          <h2 id="favorites-title" className="text-sm font-semibold tracking-tight text-slate-700">
            즐겨찾기
          </h2>
        </div>
        <Badge variant={isFull ? 'destructive' : 'secondary'} className="px-2 py-0 font-mono text-[10px]">
          {favorites.length} / {MAX_FAVORITES}
        </Badge>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center">
          <Star className="mb-2 size-8 text-slate-200" />
          <p className="text-xs font-medium text-slate-400">즐겨찾기한 장소가 없습니다.</p>
        </div>
      ) : (
        <Suspense fallback={<FavoriteListSkeleton count={favorites.length} />}>
          <FavoriteCardList favorites={favorites} onEdit={setEditingFavorite} onDelete={handleRemove} />
        </Suspense>
      )}

      <EditNameModal
        isOpen={!!editingFavorite}
        currentName={editingFavorite?.name ?? ''}
        onClose={() => setEditingFavorite(null)}
        onSave={handleSaveName}
      />
    </section>
  );
}

type FavoriteCardListProps = {
  favorites: FavoriteLocation[];
  onEdit: (favorite: FavoriteLocation) => void;
  onDelete: (id: string) => void;
};

function FavoriteCardList({ favorites, onEdit, onDelete }: FavoriteCardListProps) {
  const weatherData = useFavoriteWeather(favorites);
  const { setLocation } = useLocationStore();

  return (
    <ul className="grid grid-cols-1 gap-3">
      {favorites.map((favorite) => {
        const weather = weatherData.find((w) => w.id === favorite.id);
        if (!weather) return null;

        return (
          <li key={favorite.id} className="list-none">
            <FavoriteCard
              favorite={favorite}
              weather={weather.weather}
              onClick={() => setLocation(favorite.coordinates, favorite.name)}
              onEdit={() => onEdit(favorite)}
              onDelete={() => onDelete(favorite.id)}
            />
          </li>
        );
      })}
    </ul>
  );
}
