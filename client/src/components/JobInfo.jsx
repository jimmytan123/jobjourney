import styled from 'styled-components';

const JobInfo = ({ text, icon }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .icon {
    font-size: 1rem;
    display: flex;
    align-items: center;

    svg {
      color: var(--text-secondary-color);
    }
  }

  .text {
    margin: 0;
    color: var(--text-secondary-color);
    text-transform: capitalize;
  }
`;
