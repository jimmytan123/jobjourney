import { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SmallSidebar from '../../components/SmallSidebar';
import LargeSidebar from '../../components/LargeSidebar';
import Navbar from '../../components/Navbar';
import { Wrapper } from './styled';
import { checkAndSetDefaultTheme } from '../../utils/checkTheme';

// Create a React Context for dashboard items
const DashboardContext = createContext();

// Layout component for nav, sidebar, body content and shared states
const DashboardLayout = () => {
  // Mock User Data
  const user = { name: 'John' };
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

  const logoutUser = () => {
    console.log('logout');
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
              <Outlet />
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
