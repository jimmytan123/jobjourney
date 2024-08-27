import { Form, useActionData, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormRow from '../../components/FormRow';
import baseFetch from '../../utils/apiService';
import { useDashboardContext } from '../DashboardLayout';
import { Wrapper } from '../../assets/styles/styledDashboardFormPage';
import { FaChevronLeft } from 'react-icons/fa6';
import SubmitButton from '../../components/SubmitButton';

export const action = async ({ request }) => {
  const formData = await request.formData();

  // Input validation
  const name = formData.get('name');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const location = formData.get('location');
  const avatar = formData.get('avatar');

  const errors = {};

  if (!name) errors.firstName = 'Name required';
  if (!lastName) errors.lastName = 'Last name required';
  if (!email || !/^\S+@\S+\.\S+$/.test(email))
    errors.email = 'Valid email is required';
  if (!location) errors.location = 'Location is required';
  if (avatar && avatar.size > 50000) {
    errors.avatar = 'Image size too large, please upload again';
  }

  if (Object.keys(errors).length > 0) {
    // console.log(errors);
    return errors;
  }

  try {
    await baseFetch.patch('/users/current', formData); // directly submit the form data for file upload inputs
    toast.success('Profile updated');
  } catch (err) {
    // console.log(err);
    toast.error(err?.response?.data?.message);
  }

  return null;
};

const Profile = () => {
  const { user } = useDashboardContext();

  const errors = useActionData();

  return (
    <Wrapper>
      <Form
        method="post"
        className="dashboard-form"
        encType="multipart/form-data" // necessary
      >
        <h4 className="form-title">
          <Link to="/dashboard/jobs" className="back-btn">
            <FaChevronLeft />
          </Link>
          Update User Profile
        </h4>
        <div className="form-center">
          <div>
            <div className="form-row">
              <label htmlFor="avatar" className="form-label">
                Avatar (max 0.5MB)
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="form-input"
                accept="image/*"
              />
            </div>
            {errors?.avatar && (
              <p className="form-input-error">{errors.avatar}</p>
            )}
          </div>
          <div>
            <FormRow type="text" name="name" defaultValue={user.name} />
            {errors?.firstName && (
              <p className="form-input-error">{errors.firstName}</p>
            )}
          </div>
          <div>
            <FormRow
              type="text"
              name="lastName"
              defaultValue={user.lastName}
              labelText="Last Name"
            />
            {errors?.lastName && (
              <p className="form-input-error">{errors.lastName}</p>
            )}
          </div>
          <div>
            <FormRow type="email" name="email" defaultValue={user.email} />
            {errors?.email && (
              <p className="form-input-error">{errors.email}</p>
            )}
          </div>
          <div>
            <FormRow type="text" name="location" defaultValue={user.location} />
            {errors?.location && (
              <p className="form-input-error">{errors.location}</p>
            )}
          </div>
          <SubmitButton formBtn text="Update" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
