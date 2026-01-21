import { FavoriteList } from '@/features/favorite';
import { LocationSearch } from '@/features/select-location';

export function Sidebar() {
  return (
    <section>
      <div className="border-b border-b-gray-300 pb-3">
        <LocationSearch />
      </div>
      <div className="mt-4">
        <FavoriteList />
      </div>
    </section>
  );
}
