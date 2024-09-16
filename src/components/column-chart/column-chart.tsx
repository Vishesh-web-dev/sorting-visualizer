import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useColumnChartController from "./column-chart-controller";
import { IRandomArray } from "../../types";
interface IColumnChartProps {
  chartData: IRandomArray[];
  showAnimation: boolean;
  chartOrientation: string;
}
function ColumnChart({ chartData, showAnimation, chartOrientation }: IColumnChartProps) {
  const { columnChartOptions } = useColumnChartController(chartData, showAnimation, chartOrientation);
  return (
    <HighchartsReact highcharts={Highcharts} options={columnChartOptions} />
  );
}

export default ColumnChart;
