import type { Coordinates } from '@/entities/location';
import { create } from 'zustand';

type LocationState = {
  coordinates: Coordinates | null;
  setCoordinates: (coords: Coordinates | null) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  coordinates: null,
  setCoordinates: (coordinates) => set({ coordinates }),
}));
