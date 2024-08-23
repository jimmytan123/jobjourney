import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  AllJobs,
  EditJob,
  Stats,
  Profile,
  Admin,
} from './pages';
import { checkAndSetDefaultTheme } from './utils/checkTheme';
import { registerAction } from './pages/Register';
import { loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { action as addJobAction } from './pages/AddJob';
import { loader as allJobsLoader } from './pages/AllJobs';
import { loader as editJobLoader } from './pages/EditJob';
import { action as editAction } from './pages/EditJob';

// Check UI theme settings when initialize the App, and set theme
checkAndSetDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />, // Error page component
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction, // Associate action with this route
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />, // Layout for dashboard(nav, side nav, content)
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: 'jobs',
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: 'edit-job/:jobId',
            element: <EditJob />,
            loader: editJobLoader,
            action: editAction,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
