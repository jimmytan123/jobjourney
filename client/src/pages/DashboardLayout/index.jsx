import { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SmallSidebar from '../../components/SmallSidebar';
import LargeSidebar from '../../components/LargeSidebar';
import Navbar from '../../components/Navbar';
import { Wrapper } from './styled';

// Create a React Context for dashboard items
const DashboardContext = createContext();

// Layout component for nav, sidebar, body content and shared states
const DashboardLayout = () => {
  // Mock User Data
  const user = { name: 'John' };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    console.log('toggle theme');
    // setIsDarkTheme((isDarkTheme) => !isDarkTheme);
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
