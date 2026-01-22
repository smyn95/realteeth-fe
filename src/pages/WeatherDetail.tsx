import { CardSkeleton } from '@/features/current-weather/ui/CardSkeleton';
import { WeatherDetailLayout } from '@/features/current-weather/ui/WeatherDetailLayout';
import { ErrorBoundary, ErrorFallback, Header, MainLayout } from '@/shared';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export default function WeatherDetail() {
  const { lat, lon } = useParams<{ lat: string; lon: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const locationName = searchParams.get('name') ?? undefined;

  const coordinates =
    lat && lon
      ? {
          lat: parseFloat(lat),
          lon: parseFloat(lon),
        }
      : null;

  const handleGoBack = () => {
    navigate('/');
  };

  if (!coordinates || isNaN(coordinates.lat) || isNaN(coordinates.lon)) {
    return (
      <MainLayout
        header={
          <Header>
            <BackButton onClick={handleGoBack} />
          </Header>
        }
      >
        <main className="mx-auto md:max-w-3/4">
          <ErrorFallback error={new Error('유효하지 않은 좌표입니다.')} onRetry={handleGoBack} />
        </main>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      header={
        <Header>
          <BackButton onClick={handleGoBack} />
        </Header>
      }
    >
      <main className="mx-auto md:max-w-3/4">
        <ErrorBoundary fallback={(err, reset) => <ErrorFallback error={err} onRetry={reset} />}>
          <Suspense fallback={<CardSkeleton />}>
            <WeatherDetailLayout coordinates={coordinates} locationName={locationName} />
          </Suspense>
        </ErrorBoundary>
      </main>
    </MainLayout>
  );
}

type BackButtonProps = {
  onClick: () => void;
};

function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded-lg bg-white/20 transition-colors hover:bg-white/30 md:size-9"
      aria-label="뒤로 가기"
    >
      <ArrowLeft className="size-4 text-white md:size-5" />
    </button>
  );
}
