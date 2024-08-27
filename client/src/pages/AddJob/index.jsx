import { useDashboardContext } from '../DashboardLayout';
import { Wrapper } from '../../assets/styles/styledDashboardFormPage';
import baseFetch from '../../utils/apiService';
import { toast } from 'react-toastify';
import { Form, redirect, useActionData, Link } from 'react-router-dom';
import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';
import { JOB_STATUS, JOB_TYPE } from '../../utils/constant';
import { FaChevronLeft } from 'react-icons/fa6';
import SubmitButton from '../../components/SubmitButton';

export const action = async ({ request }) => {
  // Retrieve form data
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Input validation
  const errors = {};
  if (!data.position || data.position.length < 2 || data.position.length > 50) {
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
    await baseFetch.post('/jobs', data);

    toast.success('Job added');

    return redirect('/dashboard/jobs');
  } catch (err) {
    // console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

const AddJob = () => {
  const { user } = useDashboardContext();

  const errors = useActionData(); // To retrieve data coming back from action

  return (
    <Wrapper>
      <Form method="post" className="dashboard-form">
        <h4 className="form-title">
          <Link to="/dashboard/jobs" className="back-btn">
            <FaChevronLeft />
          </Link>
          Add job
        </h4>
        <div className="form-center">
          <div>
            <FormRow type="text" name="position" />
            {errors?.position && (
              <p className="form-input-error">{errors.position}</p>
            )}
          </div>

          <div>
            <FormRow type="text" name="company" />
            {errors?.company && (
              <p className="form-input-error">{errors.company}</p>
            )}
          </div>

          <div>
            <FormRow
              type="text"
              name="jobLocation"
              defaultValue={user.location}
              labelText="Job location"
            />
            {errors?.jobLocation && (
              <p className="form-input-error">{errors.jobLocation}</p>
            )}
          </div>

          <FormRow type="text" name="link" labelText="Link(optional)" />
          <FormRowSelect
            name="jobStatus"
            labelText="Job status"
            options={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job type"
            options={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULLTIME}
          />
          <SubmitButton formBtn text="Add" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
