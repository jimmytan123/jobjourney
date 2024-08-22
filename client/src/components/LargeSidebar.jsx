import NavLinks from './NavLinks';
import styled from 'styled-components';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';

// By default, side bar will open
const LargeSidebar = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks disableToggleSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default LargeSidebar;

const Wrapper = styled.div`
  // Hide on small screen
  display: none;

  .sidebar-container {
    background: var(--background-secondary-color);
    height: 100%;
    min-height: 100vh;
    width: 250px;
    margin-left: -250px;
    transition: margin-left 0.2s ease-in-out;
  }

  .show-sidebar {
    margin-left: 0;
  }

  .content {
    position: sticky;
    top: 0;
  }

  header {
    height: var(--nav-height);
    display: flex;
    align-items: center;
    padding-left: 2.5rem;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    padding-top: 1.5rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary-color);
    padding: 1rem 2rem 1rem 2.5rem;
    text-transform: capitalize;
    transition: var(--transition);
  }

  .nav-link:hover {
    color: var(--primary-500);
    padding-left: 3rem;
  }

  .icon {
    font-size: 1.5rem;
    display: grid;
    place-items: center;
  }

  .nav-link.active {
    color: var(--primary-500);
  }

  .pending {
    background-color: var(--background-color);
  }

  @media (min-width: 1024px) {
    display: block;
    box-shadow: 1px 0 0 0 rgba(0, 0, 0, 0.1);
  }
`;
