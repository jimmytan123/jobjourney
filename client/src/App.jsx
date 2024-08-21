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
  Stats,
  Profile,
  Admin,
} from './pages';
import { checkAndSetDefaultTheme } from './utils/checkTheme';
import { registerAction } from './pages/Register';

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
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />, // Layout for dashboard(nav, side nav, content)
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: 'jobs',
            element: <AllJobs />,
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
