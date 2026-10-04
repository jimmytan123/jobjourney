import { useAllJobsContext } from '../pages/AllJobs';
import JobCard from './JobCard';
import styles from './JobsContainer.module.css';
import Pagination from './Pagination';
import { toast } from 'react-toastify';
import axios from 'axios';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages, currentPage } = data;

  if (jobs.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h2>No jobs. Please add job first.</h2>
      </div>
    );
  }

  const handleExport = async () => {
    try {
      const response = await axios.get<Blob>('/api/v1/jobs/downloadExcel', {
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
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h5>
          {totalJobs} {jobs.length > 1 ? 'jobs' : 'job'} found
        </h5>
        <button className="btn export-btn" onClick={handleExport}>
          Export All Jobs
        </button>
      </div>
      <div className={styles.jobsList}>
        {jobs.map((job) => {
          return <JobCard key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && (
        <Pagination numOfPages={numOfPages} currentPage={currentPage} />
      )}
    </div>
  );
};

export default JobsContainer;
