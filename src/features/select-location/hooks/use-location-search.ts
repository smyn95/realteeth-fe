'use client';

import { getCoordinatesByLocation, searchDistricts, formatDistrictName } from '@/entities/location';
import { useDebounce, useLocationStore } from '@/shared';
import { useState, useTransition } from 'react';
import koreaDistricts from '@/shared/config/korea_districts.json';

type UseLocationSearchReturn = {
  query: string;
  setQuery: (query: string) => void;
  results: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isSelecting: boolean;
  error: string | null;
  handleSelect: (district: string) => void;
  formatDisplay: (district: string) => string;
};

export function useLocationSearch(): UseLocationSearchReturn {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const { setLocation } = useLocationStore();
  const debouncedQuery = useDebounce(query);

  const results = searchDistricts(debouncedQuery, koreaDistricts);

  const handleSelect = (district: string) => {
    const displayName = formatDistrictName(district);
    setQuery(displayName);
    setIsOpen(false);
    setError(null);

    startTransition(async () => {
      try {
        const coords = await getCoordinatesByLocation(displayName);
        setLocation(coords, displayName);
      } catch {
        setError('해당 장소의 정보가 제공되지 않습니다.');
      }
    });
  };

  return {
    query,
    setQuery: (value: string) => {
      setQuery(value);
      setIsOpen(value.length > 0);
      setError(null);
    },
    results,
    isOpen,
    setIsOpen,
    isSelecting: isPending,
    error,
    handleSelect,
    formatDisplay: formatDistrictName,
  };
}
