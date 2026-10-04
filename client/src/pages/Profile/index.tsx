import type { ActionFunctionArgs } from 'react-router-dom';
import type { QueryClient } from '@tanstack/react-query';
import { getFormString } from '../../utils/formData';
import type { ValidationErrors } from '../../types';
import { getApiErrorMessage } from '../../utils/apiError';
import { Form, useActionData, Link, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormRow from '../../components/FormRow';
import baseFetch from '../../utils/apiService';
import { useDashboardContext } from '../DashboardLayout';
import styles from '../../assets/styles/DashboardFormPage.module.css';
import { FaChevronLeft } from 'react-icons/fa6';
import SubmitButton from '../../components/SubmitButton';

export const action = (queryClient: QueryClient) => {
  return async ({ request }: ActionFunctionArgs<unknown>) => {
    const formData = await request.formData();

    // Input validation
    const name = getFormString(formData, 'name');
    const lastName = getFormString(formData, 'lastName');
    const email = getFormString(formData, 'email');
    const location = getFormString(formData, 'location');
    const avatar = formData.get('avatar');

    const errors: ValidationErrors = {};

    if (!name) errors.firstName = 'Name required';
    if (!lastName) errors.lastName = 'Last name required';
    if (!email || !/^\S+@\S+\.\S+$/.test(email))
      errors.email = 'Valid email is required';
    if (!location) errors.location = 'Location is required';
    if (avatar instanceof File && avatar.size > 50000) {
      errors.avatar = 'Image size too large, please upload again';
    }

    if (Object.keys(errors).length > 0) {
      // console.log(errors);
      return errors;
    }

    try {
      await baseFetch.patch('/users/current', formData); // directly submit the form data for file upload inputs

      // Invalidate user query
      queryClient.invalidateQueries({ queryKey: ['user'] });

      toast.success('Profile updated');

      return redirect('/dashboard/jobs');
    } catch (err) {
      // console.log(err);
      toast.error(getApiErrorMessage(err));
      return null;
    }
  };
};

const Profile = () => {
  const { user } = useDashboardContext();

  const errors = useActionData<ValidationErrors>();

  return (
    <div className={styles.wrapper}>
      <Form
        method="post"
        className={styles.dashboardForm}
        encType="multipart/form-data" // necessary
      >
        <h4 className={styles.formTitle}>
          <Link to="/dashboard/jobs" className={styles.backBtn}>
            <FaChevronLeft />
          </Link>
          Update User Profile
        </h4>
        <div className={styles.formCenter}>
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
    </div>
  );
};

export default Profile;
