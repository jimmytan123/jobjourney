import type { MouseEvent } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';
import styles from './SmallSidebar.module.css';
import { IoClose } from 'react-icons/io5';
import Logo from './Logo';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  const handleCloseSideBar = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // disable parent events(sidebar-container)
    toggleSidebar();
  };

  return (
    <nav className={styles.wrapper}>
      <div
        className={`${styles.sidebarContainer} ${showSidebar ? styles.showSidebar : ''}`}
        onClick={toggleSidebar}
        data-testid='sidebar-container'
      >
        <div className={styles.content}>
          <div className={styles.headerGroup}>
            <button
              type="button"
              className={styles.closeBtn}
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
      <div className={styles.backdrop}></div>
    </nav>
  );
};

export default SmallSidebar;
