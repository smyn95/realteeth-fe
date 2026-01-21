import { List } from 'lucide-react';

type Props = {
  onToggle: () => void;
};

export function MobileMenuButton({ onToggle }: Props) {
  return (
    <button
      type="button"
      aria-label="메뉴 열기"
      className="flex size-8 items-center justify-center rounded-lg bg-white/20 transition-colors hover:bg-white/30 lg:hidden"
      onClick={onToggle}
    >
      <List className="size-5 text-white" />
    </button>
  );
}
