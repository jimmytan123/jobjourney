import type { QueryClient } from '@tanstack/react-query';
import type { StatsResponse } from '../../types';
import Loading from '../../components/Loading';
import StatsContainer from '../../components/StatsContainer';
import ChartsContainer from '../../components/ChartsContainer';
import baseFetch from '../../utils/apiService';
import { useQuery } from '@tanstack/react-query';

// Define Tanstack stats query
const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await baseFetch.get<StatsResponse>('jobs/stats');
    return response.data;
  },
};

// router loader needs access to queryClient
export const loader = (queryClient: QueryClient) => {
  return async () => {
    // https://tkdodo.eu/blog/react-query-meets-react-router#querifying-the-example
    await queryClient.fetchQuery(statsQuery);

    return null;
  };
};

const Stats = () => {
  const { data, error, isError } = useQuery(statsQuery);
  if (!data) {
    if (isError) throw error;
    return <Loading />;
  }
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
