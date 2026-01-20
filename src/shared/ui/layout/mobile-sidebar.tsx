import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import type { ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

export function MobileSidebar(props: Props) {
  const { isOpen, onOpenChange, children } = props;

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction="left">
      <DrawerContent className="h-full max-h-full rounded-none">
        <DrawerHeader className="sr-only">
          <DrawerTitle>메뉴</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
