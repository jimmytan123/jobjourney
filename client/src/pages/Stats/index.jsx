import StatsContainer from '../../components/StatsContainer';
import ChartsContainer from '../../components/ChartsContainer';
import baseFetch from '../../utils/apiService';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  try {
    const { data } = await baseFetch.get('jobs/stats');

    return data;
  } catch (err) {
    return err;
  }
};

const Stats = () => {
  const { jobStatusStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={jobStatusStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
