import { Form, redirect, useActionData } from 'react-router-dom';
import Logo from '../../components/Logo';
import FormRow from '../../components/FormRow';
import Wrapper from '../../assets/styles/styledAuthPage';
import baseFetch from '../../utils/apiService';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/SubmitButton';

export const action = async ({ request, params }) => {
  // Retrieve reset token
  const token = params.token;
  console.log(token);

  // Retrieve form data
  const formData = await request.formData();

  // Retrieve inputs
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  // Input validation
  const errors = {};
  if (!password || password.length < 8 || password.length > 20)
    errors.password = 'Password must be at least 8 and at most 20 characters';
  if (password !== confirmPassword)
    errors.confirmPassword = 'Passwords do not match';

  // If there are validation errors, return them
  if (Object.keys(errors).length) {
    // console.log(errors);
    return errors;
  }

  // Otherwise, make api call to update password
  try {
    await baseFetch.post('/auth/newpassword', { password, token });

    toast.success(
      'Reset password success, now you can login with your new password'
    );

    return redirect('/login');
  } catch (err) {
    // console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

const NewPassword = () => {
  const errors = useActionData(); // To retrieve data coming back from action

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Enter New Password</h4>
        <FormRow name="password" type="password" />
        {errors?.password && (
          <p className="form-input-error">{errors.password}</p>
        )}
        <FormRow
          name="confirmPassword"
          labelText="Confirm Password"
          type="password"
        />
        {errors?.confirmPassword && (
          <p className="form-input-error">{errors.confirmPassword}</p>
        )}
        <SubmitButton text="Update password" />
      </Form>
    </Wrapper>
  );
};

export default NewPassword;
