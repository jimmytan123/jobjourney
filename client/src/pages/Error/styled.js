import styled from 'styled-components';

export const StyledWrapper = styled.div`
  min-height: 100vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    min-width: 200px;
    width: 20vw;
    max-width: 600px;
    height: auto;
    object-fit: cover;
    margin: 0 auto 2rem;

    display: block;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  p {
    line-height: 1.4;
    margin: 0.5rem 0 1rem;
    color: var(--text-secondary);
  }

  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }
`;
