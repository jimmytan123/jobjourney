import styled from 'styled-components';

export const Wrapper = styled.div`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }

  .dashboard-content {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }

  @media (min-width: 1024px) {
    .dashboard {
      // Update to 2 columns layout
      // auto -> based on the width of the large side bar
      grid-template-columns: auto 1fr;
    }

    .dashboard-content {
      width: 90%;
    }
  }
`;
