import { useGeolocation } from '@/features/select-location';
import { ErrorBoundary, ErrorFallback, useLocationStore } from '@/shared';
import { Suspense } from 'react';
import { CardSkeleton } from './CardSkeleton';
import { WeatherLayout } from './WeatherLayout';

export function WeatherRoot() {
  const { coordinates } = useLocationStore();
  const { requestLocation, isLoading, error } = useGeolocation(true);

  if (error) {
    return <ErrorFallback error={new Error(error)} onRetry={requestLocation} />;
  }

  if (isLoading || !coordinates) {
    return (
      <div aria-busy="true" aria-live="polite">
        <CardSkeleton />
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={(err, reset) => <ErrorFallback error={err} onRetry={reset} />}>
      <Suspense fallback={<CardSkeleton />}>
        <WeatherLayout coordinates={coordinates} />
      </Suspense>
    </ErrorBoundary>
  );
}
