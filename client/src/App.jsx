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
import { action as deleteAction } from './pages/DeleteJob';
import { loader as adminLoader } from './pages/Admin';
import { action as profileAction } from './pages/Profile';
import { loader as statsLoader } from './pages/Stats';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorComponent from './components/ErrorComponent';
import ForgetPassword from './pages/ForgetPassword';
import { action as forgetPasswordAction } from './pages/ForgetPassword';
import NewPassword from './pages/NewPassword';
import { action as ResetPasswordAction } from './pages/NewPassword';

// Check UI theme settings when initialize the App, and set theme
checkAndSetDefaultTheme();

// Create a react query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 mins
    },
  },
});

// Create router and define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />, // Error page component, catch-all
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
        element: <Login queryClient={queryClient} />,
        action: loginAction(queryClient),
      },
      {
        path: 'forget-password',
        element: <ForgetPassword />,
        action: forgetPasswordAction,
      },
      {
        path: 'reset/:token',
        element: <NewPassword />,
        action: ResetPasswordAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout queryClient={queryClient} />, // Layout for dashboard(nav, side nav, content)
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction(queryClient),
          },
          {
            path: 'jobs',
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
            errorElement: <ErrorComponent />,
          },
          {
            path: 'edit-job/:jobId',
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editAction(queryClient),
          },
          {
            path: 'delete-job/:jobId',
            action: deleteAction(queryClient), //https://reactrouter.com/en/main/start/tutorial#deleting-records
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorComponent />,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* Dev tool only will show in dev mode */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
