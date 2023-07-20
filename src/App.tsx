import {library} from '@fortawesome/fontawesome-svg-core';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {Toaster} from 'react-hot-toast';
import {createHashRouter, RouterProvider} from 'react-router-dom';

import ProtectedRoutes from '@/components/ProtectedRoutes';
import BookDetail from '@/routes/BookDetail';
import ErrorNotFound from '@/routes/ErrorNotFound';
import Home from '@/routes/Home';
import Login from '@/routes/Login';
import Register from '@/routes/Register';
import Root from '@/routes/Root';
import {useAppSelector} from '@/store';
import {isDarkSelector} from '@/store/reducers/theme';

library.add(fas, far);

const router = createHashRouter([
  {
    path: '/home',
    element: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/book/:bookId',
    element: (
      <ProtectedRoutes>
        <BookDetail />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/404',
    element: <ErrorNotFound />,
  },
  {
    path: '/',
    element: <Root />,
  },
]);

const App: React.FC = () => {
  const isDark = useAppSelector(isDarkSelector);

  React.useEffect(() => {
    const root = window.document.documentElement;

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
