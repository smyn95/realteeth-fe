import { useMobileMenu } from '@/shared/hooks';
import { Header, MainLayout, MobileMenuButton, MobileSidebar, Sidebar } from '@/shared/ui/layout';

export default function Home() {
  const { isOpen, toggleMobileSidebar } = useMobileMenu();

  return (
    <>
      <MainLayout
        header={
          <Header>
            <MobileMenuButton onToggle={toggleMobileSidebar} />
          </Header>
        }
        sidebar={<Sidebar />}
      >
        <main className="mx-auto md:max-w-3/4">main</main>
      </MainLayout>

      <MobileSidebar isOpen={isOpen} onOpenChange={toggleMobileSidebar}>
        <Sidebar />
      </MobileSidebar>
    </>
  );
}
