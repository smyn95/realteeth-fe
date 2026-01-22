import type { Coordinates } from '@/entities/location';
import { canAddFavorite, createFavoriteLocation, isDuplicateFavorite, isValidName, type FavoriteLocation } from '@/entities/favorite';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoriteState = {
  favorites: FavoriteLocation[];
  addFavorite: (coordinates: Coordinates, name: string) => boolean;
  removeFavorite: (id: string) => void;
  updateFavoriteName: (id: string, name: string) => boolean;
};

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (coordinates, name) => {
        const { favorites } = get();

        if (!canAddFavorite(favorites)) {
          return false;
        }

        if (isDuplicateFavorite(favorites, coordinates.lat, coordinates.lon)) {
          return false;
        }

        if (!isValidName(name)) {
          return false;
        }

        const newFavorite = createFavoriteLocation(coordinates, name);
        set({ favorites: [...favorites, newFavorite] });
        return true;
      },

      removeFavorite: (id) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((fav) => fav.id !== id) });
      },

      updateFavoriteName: (id, name) => {
        if (!isValidName(name)) {
          return false;
        }

        const { favorites } = get();
        set({
          favorites: favorites.map((fav) => (fav.id === id ? { ...fav, name: name.trim() } : fav)),
        });
        return true;
      },
    }),
    {
      name: 'favorite-locations',
    },
  ),
);
