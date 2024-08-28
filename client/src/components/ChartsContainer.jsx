import BarChart from './BarChart';
import AreaChart from './AreaChart';
import styled from 'styled-components';
import { useState } from 'react';

const ChartsContainer = ({ data }) => {
  const [chartType, setChartType] = useState('bar');

  return (
    <Wrapper>
      <h4>Monthly Applications Stats</h4>
      <div className="selector">
        <button
          onClick={() => setChartType('bar')}
          className={chartType === 'bar' ? 'active btn' : 'btn'}
        >
          Bar Chart
        </button>
        <button
          onClick={() => setChartType('area')}
          className={chartType === 'area' ? 'active btn' : 'btn'}
        >
          Area Chart
        </button>
      </div>
      {chartType === 'bar' ? (
        <BarChart data={data} />
      ) : (
        <AreaChart data={data} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;

const Wrapper = styled.div`
  margin-top: 3rem;
  text-align: center;

  .selector {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin: 2rem 0 1rem;

    .active {
      background-color: var(--primary-800);
    }
  }
`;
