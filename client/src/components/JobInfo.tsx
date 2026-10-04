import type { ReactNode } from 'react';
import styles from './JobInfo.module.css';

const JobInfo = ({ text, icon }: { text: string; icon: ReactNode }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>{icon}</span>
      <span className={`text ${styles.text}`}>{text}</span>
    </div>
  );
};

export default JobInfo;
