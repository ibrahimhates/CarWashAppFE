import CustomerAppointment from './customer/CustomerAppointment'
import ManagerAppointment from './manager/ManagerAppointment'
import Cookies from 'js-cookie'
import {customJwtDecode} from '../../CustomJwt'
import EmployeeAppointment from './employee/EmployeeAppointment'
import {useEffect} from 'react'

interface tokenModel {
  whoseToken: string
  role:string
}

const AppointmentPage = () => {
  const token: any = Cookies.get('authToken')
  const user: tokenModel = customJwtDecode(token)

  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <div>
      {user.whoseToken === 'Employee' && user.role !== "Worker" && <ManagerAppointment />}
      {user.whoseToken === 'Employee' && user.role === "Worker" && <EmployeeAppointment />}
      {user.whoseToken === 'Customer' && <CustomerAppointment />}
    </div>
  )
}

export default AppointmentPage
