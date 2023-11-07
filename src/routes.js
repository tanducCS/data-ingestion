import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import TaskPage from './pages/TaskPage';
import SchemaPage from './pages/SchemaPage';
import DataSourcePage from './pages/DataSourcePage';
import DataSourceShowPage from './pages/DataSourceShowPage';
import TaskShowPage from './pages/TaskShowPage';
import UserShowPage from './pages/UserShowPage';
import UserManage from './pages/UserManage';
import SensorManage from './pages/SensorManage';

// ----------------------------------------------------------------------

export default function Router() {
  const token = localStorage.getItem('token');
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" /> , index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { 
          path: 'user', 
          children: [
            {path: 'index', element: <UserPage/>},
            {path: 'show', element: <UserShowPage/>},
          ]
        },
        { path: 'products', element: <ProductsPage /> },
        { path: 'schema', element: <SchemaPage /> },
        { path: 'data-source',
          children: [
            { path: 'index', element: <DataSourcePage /> }, 
            { path: 'show', element: <DataSourceShowPage /> }, 
          ],
        },
        { path: 'blog', element: <BlogPage /> },
        {
          path: 'task',
          children: [
            { path: 'index', element: <TaskPage /> }, 
            { path: 'show', element: <TaskShowPage /> }, 
          ],
        },
        { path: 'usr', element: <UserManage /> },
        { path: 'sensor', element: <SensorManage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
