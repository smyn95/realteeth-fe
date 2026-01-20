import { useState } from 'react';

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileSidebar = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    toggleMobileSidebar,
  };
}
