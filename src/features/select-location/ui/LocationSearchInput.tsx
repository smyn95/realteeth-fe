import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  disabled?: boolean;
};

export function LocationSearchInput({ value, onChange, onFocus, disabled }: Props) {
  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" aria-hidden="true" />
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
