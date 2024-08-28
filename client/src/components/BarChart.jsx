import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const BarChartComponent = ({ data }) => {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#5d79d4" barSize={60} activeDot={{ r: 8 }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
