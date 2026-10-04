import styles from './Landing.module.css';
import landingImg from '../../assets/images/landing-img.svg';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';

const Landing = () => {
  return (
    <div className={styles.wrapper}>
      <nav>
        <Logo />
      </nav>
      <div className={`container ${styles.page}`}>
        <div className={styles.info}>
          <h1>
            Job Application <span>Tracking</span> Tool
          </h1>
          <p>
            Welcome to JobJourney – your ultimate tool for tracking and managing
            job applications. Stay organized, monitor your progress, and keep
            every opportunity within reach. Let JobJourney simplify your job
            search and guide you toward your next career milestone.
          </p>
          <Link to="/register" className={`btn ${styles.registerLink}`}>
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img
          src={landingImg}
          alt="job posting"
          className={`img ${styles.mainImg}`}
        />
      </div>
    </div>
  );
};

export default Landing;
