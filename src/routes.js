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
import DataSourcesPage from './pages/DataSourcePage';
import DataSourceShowPage from './pages/DataSourceShowPage';
import TaskShowPage from './pages/TaskShowPage';
import UserShowPage from './pages/UserShowPage';
import UserManage from './pages/UserManage';
import SensorManage from './pages/SensorManage';
import UserNewPage from './pages/UserNewPage';
import DataCategoriesPage from './pages/DataCategoriesPage';
import DataCategoriesShowPage from './pages/DataCategoriesShowPage';
import DataCategoriesNewPage from './pages/DataCategoriesNewPage';
import DataSchemaPage from './pages/DataSchemaPage';
import DataSchemaShowPage from './pages/DataSchemaShowPage';
import DataSchemaNewPage from './pages/DataSchemaNewPage';
import DataSourceNewPage from './pages/DataSourceNewPage';

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
            {path: 'new', element: <UserNewPage/>},
          ]
        },
        { path: 'data_schema',
          children: [
            { path: 'index', element: <DataSchemaPage /> }, 
            { path: 'show', element: <DataSchemaShowPage /> }, 
            { path: 'new', element: <DataSchemaNewPage /> }, 
          ],
        },
        { path: 'data_sources',
          children: [
            { path: 'index', element: <DataSourcesPage /> }, 
            { path: 'show', element: <DataSourceShowPage /> }, 
            { path: 'new', element: <DataSourceNewPage /> }, 
          ],
        },
        { path: 'data_categories',
          children: [
            { path: 'index', element: <DataCategoriesPage /> }, 
            { path: 'show', element: <DataCategoriesShowPage /> }, 
            { path: 'new', element: <DataCategoriesNewPage /> }, 
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
