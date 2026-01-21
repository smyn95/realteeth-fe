import { LocationSearch } from '@/features/select-location';
import { Star } from 'lucide-react';

export function Sidebar() {
  return (
    <section aria-labelledby="favorites-title">
      <div className="border-b border-b-gray-300 pb-3">
        <LocationSearch />
      </div>
      <div role="status" className="mt-4 flex items-center gap-2 text-indigo-600">
        <Star className="size-5" aria-hidden="true" />
        <p className="text-sm text-slate-500">즐겨찾기</p>
      </div>
    </section>
  );
}
