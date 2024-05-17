import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';

const HomePage = lazy(() => import('./pages/HomePage'));
const EventPage = lazy(() => import('./pages/EventPage'));
const Registration = lazy(() => import('./pages/Registration'));

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      id: 'root',
      children: [
        {
          index: true,
          element: <Suspense fallback={<p>Loading...</p>}><HomePage /></Suspense>,
          loader: (meta) =>
            import('./pages/HomePage').then((module) => module.loader(meta)),
        },
        {
          path: ':id',
          children: [
            {
              index: true,
              element: <Suspense fallback={<p>Loading...</p>}><EventPage /></Suspense>,
              id: 'event-detail',
              loader: (meta) =>
                import('./pages/EventPage').then((module) => module.loader(meta)),
            },
            {
              path: 'registration',
              element: <Suspense fallback={<p>Loading...</p>}><Registration /></Suspense>,
              action: (meta) =>
                import('./pages/Registration').then((module) => module.action(meta)),
            }
          ]
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App