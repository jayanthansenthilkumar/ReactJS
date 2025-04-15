import Card from './Card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const ChartCard = ({ title, data, dataKey, stroke, fill }) => {
  return (
    <Card title={title}>
      <div className="chart-content">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={dataKey} stroke={stroke} fill={fill} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ChartCard;