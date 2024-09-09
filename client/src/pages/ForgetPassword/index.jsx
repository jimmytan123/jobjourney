import { Link, Form, redirect, useActionData } from 'react-router-dom';
import Logo from '../../components/Logo';
import FormRow from '../../components/FormRow';
import Wrapper from '../../assets/styles/styledAuthPage';
import baseFetch from '../../utils/apiService';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/SubmitButton';

export const action = async ({ request }) => {
  // Retrieve form data
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Retrieve inputs
  const email = formData.get('email');

  // Input validation
  const errors = {};
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
    toast.error(err?.response?.data?.message);
    return err;
  }
};

const ForgetPassword = () => {
  const errors = useActionData(); // To retrieve data coming back from action

  return (
    <Wrapper>
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
          <Link to="/login" className="backhome-link">
            Back to login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default ForgetPassword;
