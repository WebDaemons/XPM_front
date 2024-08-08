import React from 'react';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { Sidebar } from '@components/Sidebar/Sidebar';
import Auth from '@pages/AuthPage/Auth';
import Todolist from '@pages/TodolistPage/Todolist';
import Settings from '@pages/SettingsPage/Settings';
import Home from '@pages/HomePage/Home';
import NotFound from '@pages/NotFoundPage/NotFound';
import Notes from './pages/NotesPage/Notes';

function App() {
  const { isAuthenticated } = useAuth();

  const Layout = () => {
    return (
      <div style={{ display: 'flex', transition: 'all 0.5s ease' }}>
        <Sidebar />
        <Outlet />
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
          children:[
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
