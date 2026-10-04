import Loading from '../../components/Loading';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom';
import type { QueryClient } from '@tanstack/react-query';
import { getTextFormData } from '../../utils/formData';
import type { SingleJobResponse, ValidationErrors } from '../../types';
import { getApiErrorMessage } from '../../utils/apiError';
import {
  Form,
  useLoaderData,
  redirect,
  useActionData,
  Link,
} from 'react-router-dom';
import baseFetch from '../../utils/apiService';
import { toast } from 'react-toastify';
import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';
import styles from '../../assets/styles/DashboardFormPage.module.css';
import { JOB_STATUS, JOB_TYPE } from '../../utils/constant';
import { FaChevronLeft } from 'react-icons/fa6';
import SubmitButton from '../../components/SubmitButton';
import { useQuery } from '@tanstack/react-query';

// Define Tanstack job query
const singleJobQuery = (id: string) => {
  return {
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await baseFetch.get<SingleJobResponse>(`/jobs/${id}`);

      return data;
    },
  };
};

export const loader = (queryClient: QueryClient) => {
  return async ({ params }: LoaderFunctionArgs<unknown>) => {
    const id = params.jobId; // Retrieve URL Params
    if (!id) throw new Response('Job not found', { status: 404 });

    try {
      const query = singleJobQuery(id);
      await queryClient.ensureQueryData(query);

      return { id };
    } catch (err) {
      toast.error(getApiErrorMessage(err));

      return redirect('/dashboard/jobs');
    }
  };
};

export const action = (queryClient: QueryClient) => {
  return async ({ request, params }: ActionFunctionArgs<unknown>) => {
    // Retrieve submitted form data
    const formData = await request.formData();
    const data = getTextFormData(formData);

    // Input validation
    const errors: ValidationErrors = {};
    if (
      !data.position ||
      data.position.length < 2 ||
      data.position.length > 50
    ) {
      errors.position =
        'Position is required, and must be 2 to 50 characters long';
    }
    if (!data.company) errors.company = 'Company is required';
    if (!data.jobLocation) errors.jobLocation = 'Location is required';

    if (Object.keys(errors).length > 0) {
      // console.log(errors);
      return errors;
    }

    try {
      await baseFetch.patch(`/jobs/${params.jobId}`, data);

      queryClient.invalidateQueries({
        queryKey: ['jobs'],
      });

      queryClient.invalidateQueries({
        queryKey: ['job', params.jobId],
      });

      toast.success('Job updated');

      return redirect('/dashboard/jobs');
    } catch (err) {
      // console.log(err);
      toast.error(getApiErrorMessage(err));
      return null;
    }
  };
};

const EditJob = () => {
  // Retrieve job data to prefill the form values
  const { id } = useLoaderData<ReturnType<typeof loader>>();
  const errors = useActionData<ValidationErrors>();
  const { data, error, isError } = useQuery(singleJobQuery(id));
  if (!data) {
    if (isError) throw error;
    return <Loading />;
  }
  const job = data.job;

  return (
    <div className={styles.wrapper}>
      <Form method="patch" className={styles.dashboardForm}>
        <h4 className={styles.formTitle}>
          <Link to="/dashboard/jobs" className={styles.backBtn}>
            <FaChevronLeft />
          </Link>
          Edit job
        </h4>
        <div className={styles.formCenter}>
          <div>
            <FormRow type="text" name="position" defaultValue={job.position} />
            {errors?.position && (
              <p className="form-input-error">{errors.position}</p>
            )}
          </div>

          <div>
            <FormRow type="text" name="company" defaultValue={job.company} />
            {errors?.company && (
              <p className="form-input-error">{errors.company}</p>
            )}
          </div>
          <div>
            <FormRow
              type="text"
              name="jobLocation"
              defaultValue={job.jobLocation}
              labelText="Job location"
            />
            {errors?.jobLocation && (
              <p className="form-input-error">{errors.jobLocation}</p>
            )}
          </div>
          <FormRow
            type="text"
            name="link"
            labelText="Link(optional)"
            defaultValue={job.link ?? ''}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="Job status"
            options={Object.values(JOB_STATUS)}
            defaultValue={job.jobStatus}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job type"
            options={Object.values(JOB_TYPE)}
            defaultValue={job.jobType}
          />
          <SubmitButton formBtn text="Update" />
        </div>
      </Form>
    </div>
  );
};

export default EditJob;
