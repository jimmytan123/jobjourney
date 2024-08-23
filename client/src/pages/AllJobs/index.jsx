import JobsContainer from '../../components/JobsContainer';
import SearchContainer from '../../components/SearchContainer';
import { useContext, createContext } from 'react';
import baseFetch from '../../utils/apiService';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

export const loader = async () => {
  try {
    const { data } = await baseFetch.get('/jobs');

    return { data };
  } catch (err) {
    toast.error(err?.response?.data?.message);

    return err;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
