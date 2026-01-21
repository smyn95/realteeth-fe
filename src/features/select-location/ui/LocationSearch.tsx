import { useEffect, useRef } from 'react';
import { useLocationSearch } from '../hooks/use-location-search';
import { LocationSearchInput } from './LocationSearchInput';
import { LocationSearchResults } from './LocationSearchResults';

export function LocationSearch() {
  const { query, setQuery, results, isOpen, setIsOpen, handleSelect, formatDisplay } = useLocationSearch();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  return (
    <div ref={containerRef} className="relative">
      <LocationSearchInput value={query} onChange={setQuery} onFocus={() => query.length > 0 && setIsOpen(true)} />
      <LocationSearchResults results={results} onSelect={handleSelect} formatDisplay={formatDisplay} isVisible={isOpen} />
    </div>
  );
}
