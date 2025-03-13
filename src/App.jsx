import React, { useEffect, lazy, Suspense } from 'react';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { Sidebar } from '@components/index';
import { checkTokenExpiration } from '@store/slices//authSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@context/ThemeContext.jsx';

const Auth = lazy(() => import('./pages/AuthPage/Auth'));
const Home = lazy(() => import('./pages/HomePage/Home'));
const Todolist = lazy(() => import('./pages/TodolistPage/Todolist'));
const Settings = lazy(() => import('./pages/SettingsPage/Settings'));
const NotFound = lazy(() => import('./pages/NotFoundPage/NotFound'));
const Notes = lazy(() => import('./pages/NotesPage/Notes'));

function App() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkTokenExpiration());
    document.body.className = theme + '-theme';
  }, [dispatch, theme]);

  const Layout = () => {
    return (
      <div style={{ display: 'flex', transition: 'all 0.5s ease' }}>
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? <Navigate to="/todo" /> : <Home />,
    },
    {
      path: 'login',
      element: isAuthenticated ? <Navigate to="/todo" /> : <Auth />,
      children: [
        {
          path: 'resetpassword',
          element: <Auth />,
          children: [
            {
              path: 'confirm',
              element: <Auth />,
            },
          ],
        },
      ],
    },
    {
      path: 'signup',
      element: isAuthenticated ? <Navigate to="/todo" /> : <Auth />,
    },
    {
      path: '/',
      element: isAuthenticated ? <Layout /> : <Navigate to="/" />,
      children: [
        {
          path: 'todo',
          element: <Todolist />,
        },
        {
          path: 'notes',
          element: <Notes />,
        },
        {
          path: 'settings',
          element: <Settings />,
          children: [
            {
              path: 'profile',
              element: <Settings />,
            },
            {
              path: 'password',
              element: <Settings />,
            },
            {
              path: 'notifications',
              element: <Settings />,
            },
            {
              path: 'appearance',
              element: <Settings />,
            },
          ],
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
