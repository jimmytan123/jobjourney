import type { ActionFunctionArgs } from 'react-router-dom';
import type { QueryClient } from '@tanstack/react-query';
import { getFormString, getTextFormData } from '../../utils/formData';
import type { ValidationErrors } from '../../types';
import { getApiErrorMessage } from '../../utils/apiError';
import {
  Link,
  Form,
  redirect,
  useActionData,
  useNavigate,
} from 'react-router-dom';
import Logo from '../../components/Logo';
import FormRow from '../../components/FormRow';
import styles from '../../assets/styles/AuthPage.module.css';
import baseFetch from '../../utils/apiService';
import { toast } from 'react-toastify';
import SubmitButton from '../../components/SubmitButton';

export const loginAction = (queryClient: QueryClient) => {
  return async ({ request }: ActionFunctionArgs<unknown>) => {
    // Retrieve form data
    const formData = await request.formData();
    const data = getTextFormData(formData);

    // Retrieve inputs
    const email = getFormString(formData, 'email');
    const password = getFormString(formData, 'password');

    // Input validation
    const errors: ValidationErrors = {};
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

      // Invalidate react queries
      queryClient.invalidateQueries();

      return redirect('/dashboard');
    } catch (err) {
      // console.log(err);
      toast.error(getApiErrorMessage(err));
      return null;
    }
  };
};

const Login = ({ queryClient }: { queryClient: QueryClient }) => {
  const errors = useActionData<ValidationErrors>(); // To retrieve data coming back from action

  const navigate = useNavigate();

  const loginTestUser = async () => {
    // Invalidate react queries
    await queryClient.invalidateQueries();

    const testUserCredentials = {
      email: 'test@email.com',
      password: 'testtest',
    };

    try {
      await baseFetch.post('/auth/login', testUserCredentials);
      toast.success('Logged in as a test user');
      return navigate('/dashboard');
    } catch (err) {
      toast.error(getApiErrorMessage(err));
      return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow name="email" type="email" />
        {errors?.email && <p className="form-input-error">{errors.email}</p>}
        <FormRow name="password" type="password" />
        {errors?.password && (
          <p className="form-input-error">{errors.password}</p>
        )}
        <SubmitButton text="Login" />
        <button
          type="button"
          className="btn btn-block btn-demo"
          onClick={loginTestUser}
        >
          Explore as a test user
        </button>
        <p>
          Forget password?
          <Link to="/forget-password" className={styles.loginLink}>
            Reset Password
          </Link>
        </p>
        <p>
          Not an user yet?
          <Link to="/register" className={styles.loginLink}>
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
