import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
} from 'react-router-dom';
import Logo from '../../components/Logo';
import Wrapper from '../../assets/styles/styledAuthPage';
import FormRow from '../../components/FormRow';
import baseFetch from '../../utils/apiService';
import { toast } from 'react-toastify';

// React Router action function to handle form submission
export async function registerAction({ request }) {
  // Retrieve form data
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Retrieve the inputs
  const name = formData.get('name');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const location = formData.get('location');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  // Validate the fields
  const inputErrors = {};

  if (!name) inputErrors.firstName = 'Name required';
  if (!lastName) inputErrors.lastName = 'Last name required';
  if (!email || !/^\S+@\S+\.\S+$/.test(email))
    inputErrors.email = 'Valid email is required';
  if (!location) inputErrors.location = 'Location is required';
  if (!password || password.length < 8 || password.length > 20)
    inputErrors.password = 'Password must be at least 8 characters and max 20';
  if (password !== confirmPassword)
    inputErrors.confirmPassword = 'Passwords do not match';

  // If there are validation errors, return them
  if (Object.keys(inputErrors).length) {
    // console.log(inputErrors);
    return inputErrors;
  }

  // Otherwise create user and redirect
  try {
    await baseFetch.post('/auth/register', data);

    toast.success('Registration Successful', { autoClose: 3000 });

    return redirect('/login');
  } catch (err) {
    // console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
}

const Register = () => {
  const navigation = useNavigation();

  const errors = useActionData();
  // console.log(errors);

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow name="name" type="text" />
        {errors?.firstName && (
          <p className="form-input-error">{errors.firstName}</p>
        )}
        <FormRow name="lastName" labelText="Last Name" type="text" />
        {errors?.lastName && (
          <p className="form-input-error">{errors.lastName}</p>
        )}
        <FormRow name="location" type="text" />
        {errors?.location && (
          <p className="form-input-error">{errors.location}</p>
        )}
        <FormRow name="email" type="email" />
        {errors?.email && <p className="form-input-error">{errors.email}</p>}
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
        <button
          type="submit"
          className="btn btn-block"
          disabled={navigation.state === 'submitting'}
        >
          {navigation.state === 'submitting' ? 'Submitting' : 'Register Now'}
        </button>
        <p>
          Already an user?
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
