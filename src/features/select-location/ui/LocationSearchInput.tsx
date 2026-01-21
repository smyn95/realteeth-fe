import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type LocationSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  disabled?: boolean;
};

export function LocationSearchInput({ value, onChange, onFocus, disabled }: LocationSearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        disabled={disabled}
        placeholder="장소를 검색하세요"
        className="pl-9"
        aria-label="장소 검색"
        aria-autocomplete="list"
      />
    </div>
  );
}
