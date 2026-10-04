import NavLinks from './NavLinks';
import styles from './LargeSidebar.module.css';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';

// By default, side bar will open
const LargeSidebar = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.sidebarContainer} ${showSidebar ? '' : styles.showSidebar}`}
      >
        <div className={styles.content}>
          <header>
            <Logo />
          </header>
          <NavLinks disableToggleSidebar />
        </div>
      </div>
    </div>
  );
};

export default LargeSidebar;
