import Wrapper from '../assets/styles/styledStatsPage';
import { MdPending } from 'react-icons/md';
import StatCard from './StatCard';
import { BsPeopleFill } from 'react-icons/bs';
import { FaRegStopCircle } from 'react-icons/fa';

const StatsContainer = ({ defaultStats }) => {
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
    <Wrapper>
      {data.map((item) => {
        return <StatCard {...item} key={item.title} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
