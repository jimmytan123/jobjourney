import { useDashboardContext } from '../pages/DashboardLayout';
import styles from './ThemeToggle.module.css';
import { MdLightMode, MdModeNight } from 'react-icons/md';

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <button className={styles.wrapper} onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <MdModeNight className={styles.themeIcon} />
      ) : (
        <MdLightMode className={styles.themeIcon} />
      )}
    </button>
  );
};

export default ThemeToggle;
