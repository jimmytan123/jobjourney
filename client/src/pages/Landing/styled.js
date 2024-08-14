import styled from 'styled-components';

// Define the styled wrapper div
export const StyledWrapper = styled.div`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .info {
    margin-top: -3rem;
  }

  .logo {
    width: 6rem;
    max-height: 100%;
    object-fit: contain;
  }

  .main-img {
    display: none;
  }

  h1 {
    font-weight: bold;
    margin-bottom: 1.5rem;

    span {
      color: var(--primary-500);
    }
  }

  p {
    line-height: 1.4;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }

  .register-link {
    margin-right: 1rem;
  }

  .btn {
    padding: 0.7rem 1rem;
  }

  /* Large devices such as laptops (1024px and up) */
  @media (min-width: 1024px) {
    .page {
      flex-direction: row;
      gap: 3rem;
      align-items: center;
    }

    .info {
      margin-top: 0;
    }

    .main-img {
      display: block;
      width: 450px;
      height: auto;
      object-fit: cover;
      border-radius: var(--border-radius);
    }
  }
`;
