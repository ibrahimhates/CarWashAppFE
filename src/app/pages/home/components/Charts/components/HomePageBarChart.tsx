import React from 'react'
import ReactApexChart from 'react-apexcharts'
import {useSelector} from 'react-redux'
import { useThemeMode } from '../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const HomePageBarChart = () => {
  const mode = useSelector((state: any) => state.mode);

  const series = [
    {
      name: 'Çalışan',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: 'Ekipman',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: 'Vergiler',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ]

  const options: ApexCharts.ApexOptions | undefined = {
    chart: {
      type: 'bar',
      height: 250,
      background: 'transparent',
    },
    theme: {
      mode: mode === "light" ? "light" : "dark",
      palette: 'palette1',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: mode === 'light' ? '#CECECE' : '#585858',
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl'],
    },
    yaxis: {
      title: {
        text: 'Türk Lirası x 1000',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '.000 ₺'
        },
      },
    },
  }

  return (
    <div id='chart'>
      <ReactApexChart options={options} series={series} type='bar' height={350} />
    </div>
  )
}

export default HomePageBarChart
