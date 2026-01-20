import type { ReactNode } from 'react';

type Props = {
  header: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
};

export function MainLayout(props: Props) {
  const { header, sidebar, children } = props;

  return (
    <div className="flex h-screen overflow-hidden">
      {sidebar && (
        <aside aria-label="사이드바" className="hidden w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4 lg:block">
          {sidebar}
        </aside>
      )}

      <div className="flex flex-1 flex-col overflow-hidden bg-[#15162b]">
        {header}
        <div id="main-content" className="flex-1 overflow-y-auto p-4 outline-none md:p-6" tabIndex={-1}>
          {children}
        </div>
      </div>
    </div>
  );
}
