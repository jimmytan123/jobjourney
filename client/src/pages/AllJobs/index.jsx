import JobsContainer from '../../components/JobsContainer';
import SearchContainer from '../../components/SearchContainer';
import { useContext, createContext } from 'react';
import baseFetch from '../../utils/apiService';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Define query(accept dynamic params to make different calls)
const allJobsQuery = (queryParams) => {
  const { search, jobStatus, jobType, sort, page } = queryParams;

  return {
    // Construct Tanstack query key based on query params
    queryKey: [
      'jobs',
      search ?? '',
      jobStatus ?? 'all',
      jobType ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await baseFetch.get('/jobs', {
        params: queryParams,
      });

      return data;
    },
  };
};

export const loader = (queryClient) => {
  return async ({ request }) => {
    // Retrieve query params if it exists
    const url = new URL(request.url);
    const queryParams = Object.fromEntries([...url.searchParams.entries()]);

    // Get query
    const query = allJobsQuery(queryParams);

    // Make sure that the cache for the specified query is up-to-date. If the data is not in the cache or if it's stale, will then fetch the latest data from the server and update the cache.
    await queryClient.ensureQueryData(query);

    return { searchValues: { ...queryParams } };
  };
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { searchValues } = useLoaderData();

  // https://tanstack.com/query/latest/docs/framework/react/examples/react-router
  const { data } = useQuery(allJobsQuery(searchValues));

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
