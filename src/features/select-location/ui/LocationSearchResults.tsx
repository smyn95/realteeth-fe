import { MapPin } from 'lucide-react';

type Props = {
  results: string[];
  onSelect: (district: string) => void;
  formatDisplay: (district: string) => string;
  isVisible: boolean;
};

export function LocationSearchResults({ results, onSelect, formatDisplay, isVisible }: Props) {
  if (!isVisible || results.length === 0) return null;

  return (
    <ul
      role="listbox"
      aria-label="검색 결과"
      className="bg-background absolute top-full right-0 left-0 z-10 z-50 mt-1 max-h-60 overflow-y-auto rounded-md border shadow-lg"
    >
      {results.map((district) => (
        <li
          key={district}
          role="option"
          tabIndex={0}
          onClick={() => onSelect(district)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(district);
            }
          }}
          className="hover:bg-accent focus:bg-accent flex cursor-pointer items-center gap-2 px-3 py-2 text-sm focus:outline-none"
        >
          <MapPin className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
          <span>{formatDisplay(district)}</span>
        </li>
      ))}
    </ul>
  );
}
