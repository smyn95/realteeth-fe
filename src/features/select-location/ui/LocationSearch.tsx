'use client';

import { useEffect, useRef } from 'react';
import { useLocationSearch } from '../hooks/use-location-search';
import { LocationSearchInput } from './LocationSearchInput';
import { LocationSearchResults } from './LocationSearchResults';

export function LocationSearch() {
  const { query, setQuery, results, isOpen, setIsOpen, isSelecting, error, handleSelect, formatDisplay } =
    useLocationSearch();

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
      <LocationSearchInput
        value={query}
        onChange={setQuery}
        onFocus={() => query.length > 0 && setIsOpen(true)}
        disabled={isSelecting}
      />
      <LocationSearchResults
        results={results}
        onSelect={handleSelect}
        formatDisplay={formatDisplay}
        isVisible={isOpen}
      />
      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {isSelecting && <p className="mt-2 text-sm text-muted-foreground">위치 정보를 불러오는 중...</p>}
    </div>
  );
}
