import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: var(--border-radius);
  min-height: 100vh;
  display: grid;
  align-items: center;

  img {
    display: block;
    margin: 0 auto;
    width: 7rem;
  }

  h4 {
    font-weight: 700;
    margin: 0.5rem 0 1rem;
    text-align: center;
  }

  form {
    border-top: 0.4rem solid var(--primary-500);
    border-bottom: 0.4rem solid var(--primary-500);
  }

  .btn {
    margin-top: 2rem;
  }

  p {
    text-align: center;
    line-height: 1.4;
  }

  .login-link {
    display: inline-block;
    margin-top: 1rem;
    color: var(--primary-500);
    margin-left: 0.4rem;
  }
`;

export default Wrapper;
