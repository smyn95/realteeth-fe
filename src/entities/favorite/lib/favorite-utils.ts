import type { Coordinates } from '@/entities/location';
import type { FavoriteLocation } from '../model/types';

export const MAX_FAVORITES = 6;
const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 20;

export function canAddFavorite(favorites: FavoriteLocation[]): boolean {
  return favorites.length < MAX_FAVORITES;
}

export function isDuplicateFavorite(favorites: FavoriteLocation[], lat: number, lon: number): boolean {
  return favorites.some((fav) => fav.coordinates.lat === lat && fav.coordinates.lon === lon);
}

export function isValidName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= MIN_NAME_LENGTH && trimmed.length <= MAX_NAME_LENGTH;
}

export function generateFavoriteId(coordinates: Coordinates): string {
  return `${coordinates.lat}_${coordinates.lon}_${Date.now()}`;
}

export function createFavoriteLocation(coordinates: Coordinates, name: string): FavoriteLocation {
  return {
    id: generateFavoriteId(coordinates),
    coordinates,
    name: name.trim(),
    originalName: name.trim(),
    createdAt: Date.now(),
  };
}
