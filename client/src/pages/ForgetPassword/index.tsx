import type { ActionFunctionArgs } from 'react-router-dom';
import { getFormString, getTextFormData } from '../../utils/formData';
import type { ValidationErrors } from '../../types';
import { getApiErrorMessage } from '../../utils/apiError';
import { Link, Form, redirect, useActionData } from 'react-router-dom';
import Logo from '../../components/Logo';
import FormRow from '../../components/FormRow';
import styles from '../../assets/styles/AuthPage.module.css';
import baseFetch from '../../utils/apiService';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/SubmitButton';

export const action = async ({ request }: ActionFunctionArgs<unknown>) => {
  // Retrieve form data
  const formData = await request.formData();
  const data = getTextFormData(formData);

  // Retrieve inputs
  const email = getFormString(formData, 'email');

  // Input validation
  const errors: ValidationErrors = {};
  if (!email || !/^\S+@\S+\.\S+$/.test(email))
    errors.email = 'Email is required';

  // If there are validation errors, return them
  if (Object.keys(errors).length) {
    console.log(errors);
    return errors;
  }

  // Otherwise, make api call to start reset process
  try {
    await baseFetch.post('/auth/reset', data);

    toast.success(
      'Reset password requested. Please check your email for the reset link'
    );

    return redirect('/login');
  } catch (err) {
    // console.log(err);
    toast.error(getApiErrorMessage(err));
    return null;
  }
};

const ForgetPassword = () => {
  const errors = useActionData<ValidationErrors>(); // To retrieve data coming back from action

  return (
    <div className={styles.wrapper}>
      <Form method="post" className="form">
        <Logo />
        <h4>Forget Password</h4>
        <p>
          We will send you an email with instructions on how to reset your
          password.
        </p>
        <FormRow name="email" type="text" />
        {errors?.email && <p className="form-input-error">{errors.email}</p>}
        <SubmitButton text="Email me" />
        <p>
          <Link to="/login" className={styles.backhomeLink}>
            Back to login
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default ForgetPassword;
