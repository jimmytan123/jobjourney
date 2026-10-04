import styles from './JobInfo.module.css';

const JobInfo = ({ text, icon }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>{icon}</span>
      <span className={`text ${styles.text}`}>{text}</span>
    </div>
  );
};

export default JobInfo;
