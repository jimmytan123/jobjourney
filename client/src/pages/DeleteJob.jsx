import baseFetch from '../utils/apiService';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {
  try {
    await baseFetch.delete(`/jobs/${params.jobId}`);

    toast.success('Job deleted');
  } catch (err) {
    // console.log(err);
    toast.error(err?.response?.data?.message);
  }

  return redirect('/dashboard/jobs');
};

export default action;
