import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux'

const HomePageDonutChart = () => {
  const series = [44, 55, 41, 17, 15, 10, 8]
  const mode = useSelector((state: any) => state.mode)

  const options: ApexCharts.ApexOptions | undefined = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    theme: {
      mode: mode === 'light' ? 'light' : 'dark',
      palette: 'palette1',
    },
    labels: [
      'Team Lead',
      'Senior Developer',
      'Junior Developer',
      'Stajyer',
      'Project Manager',
      'İnsan Kaynakları',
      'Muhasebe',
    ],
    stroke: {
      width: 1,
      colors: mode === "dark" ? ["#606060"] :  ["#B9B9B9"]
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  }

  return (
    <div id='chart' style={{marginTop: '2rem'}}>
      <ReactApexChart options={options} series={series} type='donut' />
    </div>
  )
}

export default HomePageDonutChart
