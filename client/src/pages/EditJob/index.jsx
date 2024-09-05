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
import { Wrapper } from '../../assets/styles/styledDashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../utils/constant';
import { FaChevronLeft } from 'react-icons/fa6';
import SubmitButton from '../../components/SubmitButton';
import { useQuery } from '@tanstack/react-query';

// Define job query
const singleJobQuery = (id) => {
  return {
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await baseFetch.get(`/jobs/${id}`);

      return data;
    },
  };
};

export const loader = (queryClient) => {
  return async ({ params }) => {
    const id = params.jobId; // Retrieve URL Params

    try {
      const query = singleJobQuery(id);
      await queryClient.ensureQueryData(query);

      return { id };
    } catch (err) {
      toast.error(err?.response?.data?.message);

      return redirect('/dashboard/jobs');
    }
  };
};

export const action = (queryClient) => {
  return async ({ request, params }) => {
    // Retrieve submitted form data
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Input validation
    const errors = {};
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
      toast.error(err?.response?.data?.message);
      return err;
    }
  };
};

const EditJob = () => {
  // Retrieve job data to prefill the form values
  const { id } = useLoaderData();
  const { data } = useQuery(singleJobQuery(id));
  const job = data.job;

  const errors = useActionData();

  return (
    <Wrapper>
      <Form method="patch" className="dashboard-form">
        <h4 className="form-title">
          <Link to="/dashboard/jobs" className="back-btn">
            <FaChevronLeft />
          </Link>
          Edit job
        </h4>
        <div className="form-center">
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
            defaultValue={job.link}
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
    </Wrapper>
  );
};

export default EditJob;
