import {useState, useEffect, FC} from 'react'
import './Birthdays.css'
import HttpService from '../../../../services/HttpService'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import {customJwtDecode} from '../../../../CustomJwt'
import {useTranslation} from 'react-i18next'
import {Timeline} from 'antd'

interface DecodedToken {
  CompanyId?: string
}

interface Birthday {
  fullName: string
  dateOfBirth: string
}

const Birthdays: FC = () => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([])
  const {t} = useTranslation()
  const getBirthdayType = (index: number): string => {
    if (index < 2) {
      return 'danger'
    } else if (index === 2) {
      return 'warning'
    } else {
      return 'success'
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token: any = Cookies.get('authToken')
        const decodedToken: DecodedToken = customJwtDecode(token)
        const companyId = decodedToken.CompanyId
        if (companyId) {
          const response = await HttpService.get(`PersonalInfo/all/${companyId}`)
          // Doğum günlerini tarihe göre sırala
          const sortedBirthdays = response.data.sort(
            (a: {dateOfBirth: moment.MomentInput}, b: {dateOfBirth: moment.MomentInput}) => {
              // Doğum günlerini moment ile tarih olarak karşılaştır
              const dateA = moment(a.dateOfBirth)
              const dateB = moment(b.dateOfBirth)
              return dateA.isSameOrBefore(dateB) ? -1 : 1
            }
          )
          // İlk beş doğum gününü al
          const firstFiveBirthdays = sortedBirthdays.slice(0, 5)
          setBirthdays(firstFiveBirthdays)
        } else {
          console.log('CompanyId not found in token.')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])

  return (
    // <div className={`card `}>
    //   <div className='card-header align-items-center border-0 mt-4'>
    //     <h3 className='card-title align-items-start flex-column'>
    //       <span className='fw-bold mb-2 text-dark'>
    //         {t('HOME.PAGE.BIRTHDAYWIDGET.TITLE')}
    //       </span>
    //       <span className='text-muted fw-semibold fs-7'>Çalışanlar</span>
    //     </h3>
    //   </div>
    //   <div className='card-body pt-5'>
    //     <div className='timeline-label'>
    //       {birthdays.map((birthday, index) => (
    //         <div className='timeline-item' key={index}>
    //           <div className={`timeline-label fw-bold text-gray-800 fs-6 text-${getBirthdayType(index)}`}>
    //             {moment(birthday.dateOfBirth).format('DD-MM-YYYY')}
    //           </div>
    //           <div className={`timeline-badge`}>
    //             <i className={`fa fa-genderless text-${getBirthdayType(index)} fs-1`}></i>
    //           </div>
    //           <div className='timeline-content d-flex'>
    //             <span className={`fw-bold text-gray-800 ps-3 text-${getBirthdayType(index)}`}>
    //               {birthday.fullName}
    //             </span>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <>
      <p style={{opacity: 0.5}}>Yaklaşan Doğum Günleri</p>
      <Timeline items={birthdays.map((item, index) => ({children: `${new Date(item.dateOfBirth).toLocaleDateString()} - ${item.fullName}`}))} />
    </>
  )
}

export {Birthdays}
