import React from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import Logo from './Logo';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  const handleCloseSideBar = (e) => {
    e.stopPropagation(); // disable parent events(sidebar-container)
    toggleSidebar();
  };

  return (
    <Wrapper>
      <div
        className={`sidebar-container ${showSidebar ? 'show-sidebar' : ''}`}
        onClick={toggleSidebar}
        data-testid='sidebar-container'
      >
        <div className="content">
          <div className="header-group">
            <button
              type="button"
              className="close-btn"
              onClick={handleCloseSideBar}
            >
              <IoClose />
            </button>
            <header>
              <Logo />
            </header>
          </div>
          <NavLinks />
        </div>
      </div>
      <div className="backdrop"></div>
    </Wrapper>
  );
};

export default SmallSidebar;

const Wrapper = styled.nav`
  .sidebar-container {
    position: fixed;
    left: -100%;
    /* background-color: rgba(0, 0, 0, 0.65); */
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    width: 100%;
  }

  .show-sidebar {
    z-index: 99;
    opacity: 1;
    visibility: visible;
    left: 0;
  }

  .content {
    background-color: var(--background-secondary-color);
    height: 100vh;
    width: 80vw;
    padding: 1.5rem 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .header-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .close-btn {
    font-size: 1.8rem;
    color: var(--text-color);
    border-color: transparent;
    background: transparent;
    cursor: pointer;
  }

  .logo {
    width: 4rem;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: -1;
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  .show-sidebar + .backdrop {
    z-index: 9;
    opacity: 1;
    visibility: visible;
    transition: all 0.3s 0.1s ease-in-out;
  }

  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }

  .nav-link:hover {
    color: var(--primary-500);
  }

  .icon {
    font-size: 1.5rem;
    display: grid;
    place-items: center;
  }

  .nav-link.active {
    color: var(--primary-500);
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;
