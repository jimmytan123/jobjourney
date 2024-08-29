import { useAllJobsContext } from '../pages/AllJobs';
import JobCard from './JobCard';
import styled from 'styled-components';
import Pagination from './Pagination';
import UpdatedPagination from './UpdatedPagination';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages, currentPage } = data;

  if (jobs.length === 0)
    return (
      <Wrapper>
        <h2>No jobs. Please add job first.</h2>
      </Wrapper>
    );

  return (
    <Wrapper>
      <h5>
        {totalJobs} {jobs.length > 1 ? 'jobs' : 'job'} found
      </h5>
      <div className="jobs-list">
        {jobs.map((job) => {
          return <JobCard key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && (
        <UpdatedPagination numOfPages={numOfPages} currentPage={currentPage} />
      )}
    </Wrapper>
  );
};

export default JobsContainer;

const Wrapper = styled.div`
  margin-top: 3rem;

  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .jobs-list {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    .jobs-list {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;
