import { WeatherRoot } from '@/features/current-weather';
import { Header, MainLayout, MobileMenuButton, MobileSidebar, Sidebar, useMobileMenu } from '@/shared';

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
        <main className="mx-auto md:max-w-3/4">
          <WeatherRoot />
        </main>
      </MainLayout>

      <MobileSidebar isOpen={isOpen} onOpenChange={toggleMobileSidebar}>
        <Sidebar />
      </MobileSidebar>
    </>
  );
}
