import type { Coordinates } from '@/entities/location';
import { isDuplicateFavorite, MAX_FAVORITES } from '@/entities/favorite';
import { useFavoriteStore } from '@/shared/store/favorite-store';

export function useFavoriteActions() {
  const { favorites, addFavorite, removeFavorite, updateFavoriteName } = useFavoriteStore();

  const handleAdd = (coordinates: Coordinates, name: string): { success: boolean; error?: string } => {
    if (favorites.length >= MAX_FAVORITES) {
      return { success: false, error: `즐겨찾기는 최대 ${MAX_FAVORITES}개까지 추가할 수 있습니다.` };
    }

    if (isDuplicateFavorite(favorites, coordinates.lat, coordinates.lon)) {
      return { success: false, error: '이미 즐겨찾기에 추가된 장소입니다.' };
    }

    const success = addFavorite(coordinates, name);
    if (!success) {
      return { success: false, error: '즐겨찾기 추가에 실패했습니다.' };
    }

    return { success: true };
  };

  const handleRemove = (id: string) => {
    removeFavorite(id);
  };

  const handleUpdateName = (id: string, name: string): { success: boolean; error?: string } => {
    if (!name.trim()) {
      return { success: false, error: '이름을 입력해주세요.' };
    }

    if (name.trim().length > 20) {
      return { success: false, error: '이름은 20자 이하로 입력해주세요.' };
    }

    const success = updateFavoriteName(id, name);
    if (!success) {
      return { success: false, error: '이름 수정에 실패했습니다.' };
    }

    return { success: true };
  };

  const isFavorite = (lat: number, lon: number): boolean => {
    return isDuplicateFavorite(favorites, lat, lon);
  };

  return {
    favorites,
    handleAdd,
    handleRemove,
    handleUpdateName,
    isFavorite,
  };
}
