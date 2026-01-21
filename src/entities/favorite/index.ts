export type { FavoriteLocation } from './model/types';
export {
  MAX_FAVORITES,
  canAddFavorite,
  createFavoriteLocation,
  isDuplicateFavorite,
  isValidName,
} from './lib/favorite-utils';
