import { LineChart } from "@mui/x-charts/LineChart";

const Line = ({ xAxis, series }) => {
  return <LineChart xAxis={xAxis} series={series} height={300} />;
};

export default Line;
