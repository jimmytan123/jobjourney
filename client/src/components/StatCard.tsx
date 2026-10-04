import type { CSSProperties, ReactNode } from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  count: number;
  icon: ReactNode;
  color: string;
  bgcolor: string;
}

const StatCard = ({ title, count, icon, color, bgcolor }: StatCardProps) => {
  const style: CSSProperties & { '--stat-color': string; '--stat-bg-color': string } = {
    '--stat-color': color,
    '--stat-bg-color': bgcolor,
  };
  return (
    <div
      className={styles.wrapper}
      style={style}
    >
      <header className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.count}>{count}</span>
      </header>
      <h5 className={`title ${styles.title}`}>{title}</h5>
    </div>
  );
};

export default StatCard;
