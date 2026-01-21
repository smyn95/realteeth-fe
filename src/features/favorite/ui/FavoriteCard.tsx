import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { FavoriteLocation } from '@/entities/favorite';
import { getWeatherIconUrl, type Weather } from '@/entities/open-weather';
import { cn } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
  favorite: FavoriteLocation;
  weather: Weather;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

type ActionButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  label: string;
};

function ActionButton({ children, className, onClick, label }: ActionButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn('size-7 border-slate-100 bg-white/80 text-slate-400 shadow-none transition-colors', className)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
      <span className="sr-only">{label}</span>
    </Button>
  );
}

export function FavoriteCard({ favorite, weather, onClick, onEdit, onDelete }: Props) {
  return (
    <Card className="group relative cursor-pointer gap-0 overflow-hidden border-slate-300 bg-white py-0 shadow-none" onClick={onClick}>
      <div className="absolute top-3 right-3 z-10 flex gap-1.5">
        <ActionButton label="이름 수정" onClick={onEdit} className="hover:bg-indigo-50 hover:text-indigo-600">
          <Pencil className="size-3.5" />
        </ActionButton>

        <ActionButton label="즐겨찾기 삭제" onClick={onDelete} className="hover:bg-red-50 hover:text-red-500">
          <Trash2 className="size-3.5" />
        </ActionButton>
      </div>

      <CardHeader className="p-4 pr-20 pb-0">
        <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-slate-600">{favorite.name}</h3>
      </CardHeader>

      <CardContent className="flex items-center justify-between p-4 pt-3">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-0.5">
            <span className="text-2xl font-semibold tracking-tighter text-slate-800">{Math.round(weather.temperature)}</span>
            <span className="text-lg font-semibold text-slate-800">°</span>
          </div>

          <div className="mt-1 flex items-center gap-3 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-0.5">
              <span className="text-red-500/80">↑</span>
              {Math.round(weather.tempMax)}°
            </span>
            <span className="flex items-center gap-0.5">
              <span className="text-blue-500/80">↓</span>
              {Math.round(weather.tempMin)}°
            </span>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute size-10 rounded-full bg-slate-100/50 blur-lg" />
          <img src={getWeatherIconUrl(weather.icon)} alt={weather.description} className="relative size-12 object-contain" />
        </div>
      </CardContent>
    </Card>
  );
}
