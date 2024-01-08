import CustomerAppointment from './customer/CustomerAppointment'
import ManagerAppointment from './manager/ManagerAppointment'
import Cookies from 'js-cookie'
import {customJwtDecode} from '../../CustomJwt'

interface tokenModel {
  whoseToken: string
  roles:string
}

const AppointmentPage = () => {
  const token: any = Cookies.get('authToken')
  const user: tokenModel = customJwtDecode(token)

  return (
    <div>
      {user.whoseToken === 'Employee' && user.roles !== "Worker" && <ManagerAppointment />}
      {user.whoseToken === 'Customer' && <CustomerAppointment />}
    </div>
  )
}

export default AppointmentPage
