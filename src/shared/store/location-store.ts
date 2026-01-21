import type { Coordinates } from '@/entities/location';
import { create } from 'zustand';

type LocationState = {
  coordinates: Coordinates | null;
  locationName: string | null;
  locationError: string | null;
  setLocation: (coords: Coordinates, name: string) => void;
  setCoordinates: (coords: Coordinates) => void;
  setLocationError: (error: string) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  coordinates: null,
  locationName: null,
  locationError: null,
  setLocation: (coordinates, locationName) => set({ coordinates, locationName, locationError: null }),
  setCoordinates: (coordinates) => set({ coordinates, locationName: null, locationError: null }),
  setLocationError: (locationError) => set({ locationError }),
}));
