import type { QueryClient } from '@tanstack/react-query';
import type { ActionFunctionArgs } from 'react-router-dom';
import { getApiErrorMessage } from '../utils/apiError';
import baseFetch from '../utils/apiService';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const action = (queryClient: QueryClient) => {
  return async ({ params }: ActionFunctionArgs<unknown>) => {
    try {
      await baseFetch.delete(`/jobs/${params.jobId}`);

      queryClient.invalidateQueries({ queryKey: ['jobs'] });

      toast.success('Job deleted');
    } catch (err) {
      // console.log(err);
      toast.error(getApiErrorMessage(err));
    }

    return redirect('/dashboard/jobs');
  };
};

export default action;
