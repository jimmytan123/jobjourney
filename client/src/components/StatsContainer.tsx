import type { StatsResponse } from '../types';
import styles from '../assets/styles/StatsPage.module.css';
import { MdPending } from 'react-icons/md';
import StatCard from './StatCard';
import { BsPeopleFill } from 'react-icons/bs';
import { FaRegStopCircle } from 'react-icons/fa';

const StatsContainer = ({ defaultStats }: { defaultStats: StatsResponse['jobStatusStats'] }) => {
  const data = [
    {
      title: 'Pending',
      count: defaultStats?.pending || 0,
      icon: <MdPending />,
      color: '#ff9500',
      bgcolor: '#ffd000',
    },
    {
      title: 'Interview',
      count: defaultStats?.interview || 0,
      icon: <BsPeopleFill />,
      color: '#55828b',
      bgcolor: '#c9e4ca',
    },
    {
      title: 'Declined',
      count: defaultStats?.declined || 0,
      icon: <FaRegStopCircle />,
      color: '#ef6351',
      bgcolor: '#fbc3bc',
    },
  ];
  return (
    <div className={styles.wrapper}>
      {data.map((item) => {
        return <StatCard {...item} key={item.title} />;
      })}
    </div>
  );
};

export default StatsContainer;
