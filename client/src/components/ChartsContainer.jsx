import BarChart from './BarChart';
import AreaChart from './AreaChart';
import styles from './ChartsContainer.module.css';
import { useState } from 'react';

const ChartsContainer = ({ data }) => {
  const [chartType, setChartType] = useState('bar');

  return (
    <div className={styles.wrapper}>
      <h4>Monthly Applications Stats</h4>
      <div className={styles.selector}>
        <button
          onClick={() => setChartType('bar')}
          className={`btn ${chartType === 'bar' ? styles.active : ''}`}
        >
          Bar Chart
        </button>
        <button
          onClick={() => setChartType('area')}
          className={`btn ${chartType === 'area' ? styles.active : ''}`}
        >
          Area Chart
        </button>
      </div>
      {chartType === 'bar' ? (
        <BarChart data={data} />
      ) : (
        <AreaChart data={data} />
      )}
    </div>
  );
};

export default ChartsContainer;
