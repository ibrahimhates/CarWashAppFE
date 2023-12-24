import React, {useState} from 'react'
import ReactApexChart from 'react-apexcharts'
import {KTSVG} from '../../../../../_metronic/helpers'
import InfoBox from '../../../../common/components/InfoBox'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}

const HomeChart: React.FC<Props> = ({className, chartColor, chartHeight}) => {
  const [chartType, setChartType] = useState<string>('gender')

  const chartOptions = {
    labels: ['Kadın', 'Erkek'],
    colors: ['#1976D2', '#E91E63'], // Daha koyu mavi ve pembe renkler
    legend: {
      show: false,
    },
    title: {
      text: '', // Boş bir başlık
    },
  }

  const chartSeries = [50, 50]

  const ageChartData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    colors: ['#2196F3', '#FF5722', '#4CAF50', '#FFC107', '#9C27B0'],
    legend: {
      show: false,
    },
    title: {
      text: '', // Boş bir başlık
    },
  }

  const ageChartSeries = [20, 30, 25, 15, 10]

  const totalEmployees = chartSeries.reduce((acc, value) => acc + value, 0)

  const handleChartTypeChange = (newChartType: string) => {
    setChartType(newChartType)
  }

  let selectedChartOptions = chartOptions
  let selectedChartSeries = chartSeries
  let selectedChartTitle = ''

  if (chartType === 'age') {
    selectedChartOptions = ageChartData
    selectedChartSeries = ageChartSeries
    selectedChartTitle = 'Yaş Dağılımı'
  } else {
    selectedChartTitle = 'Cinsiyet Dağılımı'
  }

  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 py-1'>
        <h3 className='card-title align-items-start flex-column'>
          <div className='d-flex align-items-center'>
            <span className='card-label fw-bold fs-3'>{selectedChartTitle}</span>
            <InfoBox message='Bu grafik tüm şirketteki çalışanların cinsiyet dağılımını göstermektedir' />
          </div>
        </h3>
        <div className='separator mb-4'></div>
        <div className='card-toolbar'>
          <div className='dropdown'>
            <button
              className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary dropdown-toggle'
              type='button'
              data-bs-toggle='dropdown'
            >
              {/* <i className="fa-solid fa-filter"></i> */}
              <KTSVG path='media/icons/duotune/general/gen031.svg' className='svg-icon-1' />
            </button>
            <ul className='dropdown-menu'>
              <li>
                <a
                  className='dropdown-item'
                  href='#'
                  onClick={() => handleChartTypeChange('gender')}
                >
                  Cinsiyet
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='#' onClick={() => handleChartTypeChange('age')}>
                  Yaş
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='card-body d-flex flex-column p-2'>
        <div className='flex-grow-1'>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <ReactApexChart
              options={selectedChartOptions}
              series={selectedChartSeries}
              type='pie'
              width='300'
            />
            <ul style={{display: 'flex', flexDirection: 'column', listStyle: 'none'}}>
              {selectedChartOptions.labels.map((label, index) => (
                <li
                  key={label}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: '10px',
                    marginRight: '20px',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '12px',
                      height: '12px',
                      marginRight: '5px',
                      marginTop: '3px',
                      backgroundColor: selectedChartOptions.colors[index],
                    }}
                  ></span>
                  {`${label}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='pt-3'>
          <p className='text-center fs-6 pb-3 '>
            <span className='badge badge-light-primary fs-12'>
              Çalışan Sayısı: {totalEmployees}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export {HomeChart}
