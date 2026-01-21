import type { Coordinates } from '@/entities/location';

export type FavoriteLocation = {
  id: string;
  coordinates: Coordinates;
  name: string;
  originalName: string;
  createdAt: number;
};
