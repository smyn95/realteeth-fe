import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from '@/pages/Home';

const WeatherDetail = lazy(() => import('@/pages/WeatherDetail'));

function PageLoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#15162b]">
      <div className="size-8 animate-spin rounded-full border-4 border-white/20 border-t-white" />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/weather/:lat/:lon',
    element: (
      <Suspense fallback={<PageLoadingFallback />}>
        <WeatherDetail />
      </Suspense>
    ),
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}