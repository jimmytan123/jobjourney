import styled from 'styled-components';

const StatCard = ({ title, count, icon, color, bgcolor }) => {
  return (
    <Wrapper color={color} bgcolor={bgcolor}>
      <header className="header">
        <span className="icon">{icon}</span>
        <span className="count">{count}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatCard;

// Accept color, bgcolor as props
const Wrapper = styled.div`
  background-color: var(--background-secondary-color);
  padding: 2rem;
  border-radius: var(--border-radius);
  border-left: 3px solid ${(props) => props.color};

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;

    .icon {
      padding: 1rem;
      background-color: ${(props) => props.bgcolor};
      border-radius: var(--border-radius);
      color: ${(props) => props.color};
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .count {
      font-size: 2rem;
      font-weight: 700;
      color: ${(props) => props.color};
    }
  }

  .title {
    padding: 0.5rem;
    text-align: right;
  }
`;
