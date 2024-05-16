import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage, { loader as eventsLoader } from './pages/HomePage';
import EventPage from './pages/EventPage';
import Registration from './pages/Registration';


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
          element: <HomePage />,
          loader: eventsLoader,
        },
        {
          path: ':id',
          id: 'event-page',
          // action: profileAction,
          children: [
            {
              index: true,
              element: <EventPage />
            },
            {
              path: 'registration',
              element: <Registration />
              // action: registerAction,
            }
          ]
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App