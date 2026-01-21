import type { Coordinates } from '@/entities/location';
import { create } from 'zustand';

type LocationState = {
  coordinates: Coordinates | null;
  locationName: string | null;
  setLocation: (coords: Coordinates, name: string) => void;
  setCoordinates: (coords: Coordinates) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  coordinates: null,
  locationName: null,
  setLocation: (coordinates, locationName) => set({ coordinates, locationName }),
  setCoordinates: (coordinates) => set({ coordinates, locationName: null }),
}));
