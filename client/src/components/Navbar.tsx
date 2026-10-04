import { CgMenuLeftAlt } from 'react-icons/cg';
import styles from './Navbar.module.css';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import NavUserDropDown from './NavUserDropDown';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <nav className={styles.wrapper}>
      <div className={styles.navCenter}>
        <button
          type="button"
          className={styles.menuToggleBtn}
          onClick={toggleSidebar}
        >
          <CgMenuLeftAlt />
        </button>
        <div>
          <Logo />
          <h4 className={styles.logoText}>Dashboard</h4>
        </div>
        <div className={styles.btnContainer}>
          <ThemeToggle />
          <NavUserDropDown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
