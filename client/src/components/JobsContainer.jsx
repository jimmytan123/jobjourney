import { useAllJobsContext } from '../pages/AllJobs';
import JobCard from './JobCard';
import styled from 'styled-components';
import Pagination from './Pagination';
import UpdatedPagination from './UpdatedPagination';
import baseFetch from '../utils/apiService';
import { toast } from 'react-toastify';
import axios from 'axios';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages, currentPage } = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs. Please add job first.</h2>
      </Wrapper>
    );
  }

  const handleExport = async () => {
    try {
      const response = await axios.get('/api/v1/jobs/downloadExcel', {
        responseType: 'blob',
      });

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'jobs.xlsx'); // Set the file name
      document.body.appendChild(link);
      // Trigger the download
      link.click();
      // Clean up after download
      link.remove();

      toast.success('Exporting and downloading all jobs in Excel file');
    } catch (err) {
      console.log(err);
      
      toast.error('Exporting failed, please try again later');
    }
  };

  return (
    <Wrapper>
      <div className="heading">
        <h5>
          {totalJobs} {jobs.length > 1 ? 'jobs' : 'job'} found
        </h5>
        <button className="btn export-btn" onClick={handleExport}>
          Export All Jobs
        </button>
      </div>
      <div className="jobs-list">
        {jobs.map((job) => {
          return <JobCard key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && (
        <Pagination numOfPages={numOfPages} currentPage={currentPage} />
      )}
    </Wrapper>
  );
};

export default JobsContainer;

const Wrapper = styled.div`
  margin-top: 3rem;

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .heading h5 {
    font-weight: 700;
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
