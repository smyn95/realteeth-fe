import { Cloud } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export function Header({ children }: Props) {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between bg-transparent px-4 md:h-16 md:px-6">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-white/20 md:size-9" aria-hidden="true">
          <Cloud className="size-4 text-white md:size-5" />
        </div>
        <h1 className="text-lg font-bold text-white md:text-xl">Weather App</h1>
      </div>
      {children}
    </header>
  );
}
