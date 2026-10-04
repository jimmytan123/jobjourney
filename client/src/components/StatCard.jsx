import styles from './StatCard.module.css';

const StatCard = ({ title, count, icon, color, bgcolor }) => {
  return (
    <div
      className={styles.wrapper}
      style={{ '--stat-color': color, '--stat-bg-color': bgcolor }}
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
