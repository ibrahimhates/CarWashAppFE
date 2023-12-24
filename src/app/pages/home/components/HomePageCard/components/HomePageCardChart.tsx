import React from "react";
import ReactApexChart from "react-apexcharts";

interface Props {
  color: string,
  data: {x: string, y: number}[],
  dataName: string,
}

const HomePageCardChart: React.FC<Props> = ({color, data, dataName}) => {

  let categories: string[] = [];
  data.forEach(data => {
    categories.push(data.x);
  });


  const series = [
    {
      name: dataName,
      data: data,
    },
  ];

  const options: ApexCharts.ApexOptions | undefined = {
    chart: {
      height: 75,
      type: "line",
      
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        color: color,
        left: 2,
        top: 2,
      },
      animations: {
        enabled: true,
        speed: 800,
      }
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: ["rgba(81, 97, 206, 0.5)"]
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: [color]
    },
    xaxis: {
      type: "category",
      categories: categories,
    },
    
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={75}
      />
    </div>
  );
};

export default HomePageCardChart;