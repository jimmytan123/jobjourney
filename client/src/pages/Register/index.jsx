import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import Wrapper from '../../assets/styles/styledAuthPage';
import FormRow from '../../components/FormRow';

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow name="name" type="text" defaultValue="John" />
        <FormRow
          name="lastName"
          labelText="Last Name"
          type="text"
          defaultValue="Doe"
        />
        <FormRow name="location" type="text" defaultValue="Vancouver" />
        <FormRow name="email" type="email" defaultValue="john@email.com" />
        <FormRow name="password" type="password" defaultValue="password" />
        <FormRow
          name="confirmPassword"
          labelText="Confirm Password"
          type="password"
          defaultValue="password"
        />

        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          Already an user?
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
