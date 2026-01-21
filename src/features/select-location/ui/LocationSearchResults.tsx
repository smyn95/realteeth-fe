import { MapPin } from 'lucide-react';

type LocationSearchResultsProps = {
  results: string[];
  onSelect: (district: string) => void;
  formatDisplay: (district: string) => string;
  isVisible: boolean;
};

export function LocationSearchResults({ results, onSelect, formatDisplay, isVisible }: LocationSearchResultsProps) {
  if (!isVisible || results.length === 0) return null;

  return (
    <ul
      role="listbox"
      aria-label="검색 결과"
      className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-md border bg-background shadow-lg"
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
          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-accent focus:bg-accent focus:outline-none"
        >
          <MapPin className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span>{formatDisplay(district)}</span>
        </li>
      ))}
    </ul>
  );
}
