import { CgMenuLeftAlt } from 'react-icons/cg';
import styled from 'styled-components';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="menu-toggle-btn"
          onClick={toggleSidebar}
        >
          <CgMenuLeftAlt />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">Dashboard</h4>
        </div>
        <div className="btn-container">toggle/logout</div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-secondary-color);

  .nav-center {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 90vw;
  }

  .menu-toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
  }

  .logo-text {
    display: none;
  }

  .btn-container {
    display: flex;
    align-items: center;
  }

  @media (min-width: 1024px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }

    .logo {
      display: none;
    }

    .logo-text {
      display: inline-block;
    }
  }
`;