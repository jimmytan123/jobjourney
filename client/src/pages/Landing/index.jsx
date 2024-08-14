import { StyledWrapper } from './styled';
import landingImg from '../../assets/images/landing-img.webp';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <StyledWrapper>
      <nav>
        <img src={logo} alt="job journey" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job Application <span>Tracking</span> Tool
          </h1>
          <p>
            Welcome to JobJourney – your ultimate tool for tracking and managing
            job applications. Stay organized, monitor your progress, and keep
            every opportunity within reach. Let JobJourney simplify your job
            search and guide you toward your next career milestone.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <img src={landingImg} alt="job posting" className="img main-img" />
      </div>
    </StyledWrapper>
  );
};

export default Landing;
