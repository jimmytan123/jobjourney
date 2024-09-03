import { createContext, useContext, useState } from 'react';
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import SmallSidebar from '../../components/SmallSidebar';
import LargeSidebar from '../../components/LargeSidebar';
import Navbar from '../../components/Navbar';
import { Wrapper } from './styled';
import { checkAndSetDefaultTheme } from '../../utils/checkTheme';
import baseFetch from '../../utils/apiService';
import Loading from '../../components/Loading';

// Loader for route (React router)
export const loader = async () => {
  try {
    // Make API request to get current user info
    const { data } = await baseFetch.get('/users/current');

    return data;
  } catch (err) {
    console.log(err);

    // Redirect to login page
    if (err.response.status === 401) {
      return redirect('/login');
    }

    return err;
  }
};

// Create a React Context for dashboard items
const DashboardContext = createContext();

// Layout component for nav, sidebar, body content and shared states
const DashboardLayout = () => {
  // Access the loader data, data was fetched to the route element before it renders
  const data = useLoaderData();
  const user = data.user;

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
    localStorage.setItem('darkTheme', newIsDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar((showSidebar) => !showSidebar);
  };

  const logoutUser = async () => {
    try {
      // Make api request to destroy jwt cookie
      await baseFetch.get('/auth/logout');

      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

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
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <LargeSidebar />
          <div>
            <Navbar />
            <div className="dashboard-content">
              {navigation.state === 'loading' ? <Loading /> : <Outlet />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

// Create custom hook useDashboardContext to read and subscribe the DashboardContext
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
