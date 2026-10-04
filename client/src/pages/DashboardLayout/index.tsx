import { isAxiosError } from 'axios';
import type { QueryClient } from '@tanstack/react-query';
import type { CurrentUserResponse, DashboardContextValue } from '../../types';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  Outlet,
  redirect,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import SmallSidebar from '../../components/SmallSidebar';
import LargeSidebar from '../../components/LargeSidebar';
import Navbar from '../../components/Navbar';
import styles from './DashboardLayout.module.css';
import { checkAndSetDefaultTheme } from '../../utils/checkTheme';
import baseFetch from '../../utils/apiService';
import Loading from '../../components/Loading';
import { useQuery } from '@tanstack/react-query';

// Define Tanstack user query
const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    // Make API request to get current user info
    const { data } = await baseFetch.get<CurrentUserResponse>('/users/current');

    return data;
  },
};

// Loader for route (React router)
export const loader = (queryClient: QueryClient) => {
  return async () => {
    try {
      return await queryClient.ensureQueryData(userQuery);
    } catch (err) {
      console.log(err);

      // User not authed, redirect to login page
      if (isAxiosError(err) && err.response?.status === 401) {
        return redirect('/login');
      }

      throw err;
    }
  };
};

// Create a React Context for dashboard items
const DashboardContext = createContext<DashboardContextValue | null>(null);

// Layout component for nav, sidebar, body content and shared states
const DashboardLayout = () => {
  const { data, error, isError } = useQuery(userQuery);

  const navigate = useNavigate();
  const navigation = useNavigation();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkAndSetDefaultTheme());

  const toggleDarkTheme = () => {
    // Update theme setting
    const newIsDarkTheme = !isDarkTheme;
    setIsDarkTheme(newIsDarkTheme);

    // Target the html body element and toggle the dark-theme class, which will update the css color variables
    document.body.classList.toggle('dark-theme', newIsDarkTheme);

    // Store the theme setting to localstorage
    localStorage.setItem('darkTheme', String(newIsDarkTheme));
  };

  const toggleSidebar = () => {
    setShowSidebar((showSidebar) => !showSidebar);
  };

  const logoutUser = useCallback(async () => {
    try {
      // Make api request to destroy jwt cookie
      await baseFetch.get('/auth/logout');

      // Invalidate all react queries
      // queryClient.invalidateQueries();

      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  // Add api call response interceptor for detecting auth user error
  useEffect(() => {
    const interceptor = baseFetch.interceptors.response.use(
      (res) => res,
      (err: unknown) => {
        if (isAxiosError(err) && err.response?.status === 401) {
          navigate('/login');
        }
        return Promise.reject(err);
      }
    );

    return () => baseFetch.interceptors.response.eject(interceptor);
  }, [navigate]);

  if (!data) {
    if (isError) throw error;
    return <Loading />;
  }
  const user = data.user;

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <div className={styles.wrapper}>
        <main className={styles.dashboard}>
          <SmallSidebar />
          <LargeSidebar />
          <div>
            <Navbar />
            <div className={styles.dashboardContent}>
              {navigation.state === 'loading' ? <Loading /> : <Outlet />}
            </div>
          </div>
        </main>
      </div>
    </DashboardContext.Provider>
  );
};

// Create custom hook useDashboardContext to read and subscribe the DashboardContext
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboardContext must be used inside DashboardLayout');
  return context;
};

export default DashboardLayout;
