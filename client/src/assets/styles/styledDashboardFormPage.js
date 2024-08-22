import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: var(--background-secondary-color);
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 1.8rem;
  border-radius: var(--border-radius);

  .form-title {
    margin-bottom: 1rem;
    font-weight: 700;
  }

  .dashboard-form {
    border-radius: 0;
    margin: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin: 0;
  }

  .form-center {
    display: grid;
    row-gap: 1rem;
  }

  .form-btn {
    display: grid;
    place-items: center;
    align-self: end;
    margin-top: 1rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 3.6rem;

    .form-center {
      grid-template-columns: 1fr 1fr;
      column-gap: 2rem;
      align-items: center;
    }

    .form-btn {
      grid-column: 1 / 3;
    }
  }

  @media (min-width: 1440px) {
    padding: 6rem 5rem;

    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .form-btn {
      grid-column: 1 / 4;
    }
  }
`;
