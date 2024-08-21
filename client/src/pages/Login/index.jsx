import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
} from 'react-router-dom';
import Logo from '../../components/Logo';
import FormRow from '../../components/FormRow';
import Wrapper from '../../assets/styles/styledAuthPage';
import baseFetch from '../../utils/apiService';
import { toast } from 'react-toastify';

export const loginAction = async ({ request }) => {
  // Retrieve form data
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Retrieve inputs
  const email = formData.get('email');
  const password = formData.get('password');

  // Input validation
  const errors = {};
  if (!email) errors.email = 'Email is required';
  if (!password) errors.password = 'Password is required';

  // If there are validation errors, return them
  if (Object.keys(errors).length) {
    // console.log(errors);
    return errors;
  }

  // Otherwise, make api call to log user in, and redirect to dashboard
  try {
    await baseFetch.post('/auth/login', data);

    return redirect('/dashboard');
  } catch (err) {
    // console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const errors = useActionData(); // To retrieve data coming back from action

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow name="email" type="email" />
        {errors?.email && <p className="form-input-error">{errors.email}</p>}
        <FormRow name="password" type="password" />
        {errors?.password && (
          <p className="form-input-error">{errors.password}</p>
        )}
        <button
          type="submit"
          className="btn btn-block"
          disabled={navigation.state === 'submitting'}
        >
          {navigation.state === 'submitting' ? 'Submitting' : 'Login'}
        </button>
        <p>
          Not an user yet?
          <Link to="/register" className="login-link">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
