import { Link, useRouteError } from 'react-router-dom';
import styles from './Error.module.css';
import ErrorImg from '../../assets/images/error.svg';

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <div className={styles.wrapper}>
        <div>
          <img src={ErrorImg} alt="Not Found Error" />
          <h3>Page Not Found</h3>
          <p>The URL you are requesting not found.</p>
          <Link to="/dashboard">Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <img src={ErrorImg} alt="Error" />
        <h3>Something Went Wrong</h3>
        <p>Please try again later.</p>
      </div>
    </div>
  );
};

export default Error;
