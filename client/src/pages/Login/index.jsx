import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import FormRow from '../../components/FormRow';
import Wrapper from '../../assets/styles/styledAuthPage';

const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow name="email" type="email" defaultValue="john@email.com" />
        <FormRow name="password" type="password" defaultValue="password" />
        <button type="submit" className="btn btn-block">
          Login
        </button>
        <p>
          Not an user yet?
          <Link to="/register" className="login-link">
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
