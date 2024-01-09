import AppointmentListTable from './list/AppointmentListTable'
import {useDispatch} from 'react-redux'
import {useAuth} from '../../../modules/auth'
import {useEffect, useState} from 'react'
import {AppointmentList} from '../customer/CustomerAppointment'
import HttpService from '../../../services/HttpService'
import Cookies from 'js-cookie'
import {showNotification} from '../../../actions/notificationAction'

const ManagerAppointment = () => {
  const dispatch = useDispatch()
  const auth = useAuth()
  const [appointmentList, setAppointmentList] = useState<AppointmentList[]>([])

  useEffect(() => {
    HttpService.get(`Appointmets/all}`,Cookies.get("authToken"))
      .then((response) => {
        setAppointmentList(response.data.data)
      })
      .catch((err) => {
        const data = err.response.data
        dispatch(
          showNotification({
            type: 'error',
            message: `${data.messages}`,
          }),
        )
      })
  }, [])
  return (
    <div className='card'>
      <div className='card-header'>
        <h1 className='card-title fw-bold'>Randevular</h1>
      </div>
      <div className='card-body py-5'>
        <AppointmentListTable  appointmentList={appointmentList}  />
      </div>
    </div>
  )
}

export default ManagerAppointment
