import StatsContainer from '../../components/StatsContainer';
import ChartsContainer from '../../components/ChartsContainer';
import baseFetch from '../../utils/apiService';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Define query
const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await baseFetch.get('jobs/stats');
    return response.data;
  },
};

// router loader needs access to queryClient
export const loader = (queryClient) => {
  return async () => {
    // https://tkdodo.eu/blog/react-query-meets-react-router#querifying-the-example
    const data = await queryClient.fetchQuery(statsQuery);

    return null;
  };
};

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { jobStatusStats, monthlyApplications } = data;

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
