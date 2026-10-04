import logo from '../assets/images/logo.svg';
import styles from './Logo.module.css';

const Logo = () => {
  return <img src={logo} alt="JobJourney" className={`logo ${styles.logo}`} />;
};

export default Logo;
