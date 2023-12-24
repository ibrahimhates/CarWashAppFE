import React, {FC, useEffect, useState} from 'react'
import './Holidays.css'
import {useTranslation} from 'react-i18next'
import { Timeline } from 'antd'

interface ResmiTatiller {
  gun: string
  tarih: string
}

interface Holiday {
  resmitatiller: ResmiTatiller[]
}

const Holidays: FC = () => {
  const [holidays, setHolidays] = useState<Holiday>()
  const {t} = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.ubilisim.com/resmitatiller/')
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()

        // Tatilleri tarihe göre sırala
        const sortedHolidays = data.resmitatiller.sort(
          (a: {tarih: string | number | Date}, b: {tarih: string | number | Date}) => {
            // @ts-ignore
            return new Date(a.tarih) - new Date(b.tarih)
          }
        )

        // Sadece ilk 5 tatili al
        const firstFiveHolidays = sortedHolidays.slice(0, 5)
        console.log(firstFiveHolidays)

        setHolidays({resmitatiller: firstFiveHolidays})
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // Tatil türlerinin rengi belirlemek için bir işlev
  const getHolidayType = (index: number): string => {
    if (index < 2) {
      return 'danger'
    } else if (index === 2) {
      return 'warning'
    } else {
      return 'success'
    }
  }

  return (
    // <div className={`card $`}>
    //   {/* begin::Header */}
    //   <div className='card-header align-items-center border-0 mt-4'>
    //     <h3 className='card-title align-items-start flex-column'>
    //       <span className='fw-bold mb-2 text-dark'>
    //         {t('HOME.PAGE.CARDWIDGET17TATIL.HOLIDAYS')}
    //       </span>
    //       <span className='text-muted fw-semibold fs-7'>Yaklaşan Resmi Tatiller</span>
    //     </h3>
    //   </div>
    //   {/* begin::Header */}
    //   <div className='card-body pt-5'>
    //     <div className='timeline-label'>
    //       {holidays &&
    //         holidays.resmitatiller.map((holiday, index) => (
    //           <div className='timeline-item' key={index}>
    //             <div
    //               className={`timeline-label fw-bold text-gray-800 fs-6 text-${getHolidayType(
    //                 index
    //               )}`}
    //             >
    //               {holiday.tarih}
    //             </div>
    //             <div className='timeline-badge'>
    //               <i className={`fa fa-genderless text-${getHolidayType(index)} fs-1`}></i>
    //             </div>
    //             <div className='timeline-content d-flex'>
    //               <span className={`fw-bold text-gray-800 ps-3 text-${getHolidayType(index)}`}>
    //                 {holiday.gun}
    //               </span>
    //             </div>
    //           </div>
    //         ))}
    //     </div>
    //   </div>
    // </div>
    <>
      <p style={{opacity: 0.5}}>Yaklaşan Resmi Tatiller</p>
      <Timeline
        items={holidays?.resmitatiller.map((item) => ({children: `${item.gun} - ${item.tarih}`}))}
      />
    </>
  )
}

export {Holidays}
