import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router-dom';
import type { AllJobsContextValue, JobsResponse, JobSearchParams } from '../../types';
import Loading from '../../components/Loading';
import JobsContainer from '../../components/JobsContainer';
import SearchContainer from '../../components/SearchContainer';
import { useContext, createContext } from 'react';
import baseFetch from '../../utils/apiService';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Define query(accept dynamic params to make different calls)
const allJobsQuery = (queryParams: JobSearchParams) => {
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
      const { data } = await baseFetch.get<JobsResponse>('/jobs', {
        params: queryParams,
      });

      return data;
    },
  };
};

export const loader = (queryClient: QueryClient) => {
  return async ({ request }: LoaderFunctionArgs<unknown>) => {
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

const AllJobsContext = createContext<AllJobsContextValue | null>(null);

const AllJobs = () => {
  const { searchValues } = useLoaderData<ReturnType<typeof loader>>();

  // https://tanstack.com/query/latest/docs/framework/react/examples/react-router
  const { data, error, isError } = useQuery(allJobsQuery(searchValues));
  if (!data) {
    if (isError) throw error;
    return <Loading />;
  }

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => {
  const context = useContext(AllJobsContext);
  if (!context) throw new Error('useAllJobsContext must be used inside AllJobs');
  return context;
};

export default AllJobs;
