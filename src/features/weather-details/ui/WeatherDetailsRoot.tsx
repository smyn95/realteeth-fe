import { useGeolocation } from '@/features/select-location';
import { ErrorBoundary, ErrorFallback, useLocationStore } from '@/shared';
import { Suspense } from 'react';
import { WeatherCardSkeleton } from './WeatherCardSkeleton';
import { WeatherDetails } from './WeatherDetails';

export function WeatherDetailsRoot() {
  const { coordinates } = useLocationStore();
  const { requestLocation, isLoading, error } = useGeolocation(true);

  if (error) {
    return <ErrorFallback error={new Error(error)} onRetry={requestLocation} />;
  }

  if (isLoading || !coordinates) {
    return (
      <div aria-busy="true" aria-live="polite">
        <WeatherCardSkeleton />
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={(err, reset) => <ErrorFallback error={err} onRetry={reset} />}>
      <Suspense fallback={<WeatherCardSkeleton />}>
        <WeatherDetails coordinates={coordinates} />
      </Suspense>
    </ErrorBoundary>
  );
}
