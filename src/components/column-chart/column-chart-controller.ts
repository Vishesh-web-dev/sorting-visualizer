import Highcharts from "highcharts";
import { IRandomArray } from "../../types";
import {
  CORRECT_POSITION_COLOR,
  DEFAULT_COLUMN_COLOR,
  POSITION_CHANGED_COLOR,
} from "../../utils/enums";

type ColumnChartController = (
  chartData: IRandomArray[],
  showAnimation: boolean,
  chartOrientation: string
) => {
  columnChartOptions: Highcharts.Options;
};

const useColumnChartController: ColumnChartController = (
  chartData,
  showAnimation,
  chartOrientation
) => {
  const columnChartOptions: Highcharts.Options = {
    chart: {
      type: chartOrientation === "vertical" ? "column" : "bar",
      animation: showAnimation,
      events: {
        load: function () {},
      },
    },
    title: {
      text: "Column Chart with Position Changes",
    },
    xAxis: {
      categories: chartData.map((data) => `${data.value}`),
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      title: {
        text: "",
      },
      gridLineWidth: 1,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: "25%",
        animation: showAnimation && {
          duration: 100,
        },
        dataLabels: {
          enabled: false,
        },
      },
    },
    tooltip: {
      shared: true,
      split: true,
      useHTML: true,
      style: {
        color: "#fff",
      },
      backgroundColor: "#1F2937",
      borderColor: "#1F2937",
      borderRadius: 8,
      borderWidth: 3,
      padding: 10,
      // @ts-ignore
      formatter: function () {
        const point = this.point;
        return `<p style="margin-bottom: 2px">
              <span style="height:6px;width:6px;color: ${point.color};margin-right: 8px">\u25CF </span>
              <span style="font-size:14px;font-weight:400;line-height: 18px;">${point.x}  :</span><span style="font-weight: 600;"> ${point.y}</span>
           </p>`;
      },
    },

    legend: {
      enabled: false,
    },
    series: [
      {
        type: chartOrientation === "vertical" ? "column" : "bar",
        data: chartData.map((data) => ({
          y: data.value,
          color: data.isAtCorrectPosition
            ? CORRECT_POSITION_COLOR
            : data.isPositionChanged
            ? POSITION_CHANGED_COLOR
            : DEFAULT_COLUMN_COLOR,
        })),
      },
    ],
  };

  return {
    columnChartOptions,
  };
};

export default useColumnChartController;
