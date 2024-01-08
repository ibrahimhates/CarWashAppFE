import {useState} from 'react'
import EmployeeListTable from './list/EmployeeListTable'
import CreateModal from './create/CreateModal'
import HttpService from '../../../services/HttpService'
import {showNotification} from '../../../actions/notificationAction'
import {useDispatch} from 'react-redux'

/*
{
      "userId": 1,
      "roleId": 1,
      "roleName": "SuperAdmin",
      "hireDate": "0001-01-01T00:00:00",
      "fullName": "ibrahim ates"
    },
 */

export interface EmployeeList {
  userId: number
  roleId: number
  roleName: string
  hireDate: string
  fullName: string
}

const CustomerAppointment = () => {
  const [show, setShow] = useState(false)
  const [isExit, setExit] = useState(true)
  const [employeeList, setEmployee] = useState<EmployeeList[]>([])
  const dispatch = useDispatch()
  const fetchAllEmployee = () => {
    HttpService.get(`Employees/all`)
      .then((response) => {
        setEmployee(response.data.data)
      })
      .catch((err) => {
        const data = err.response.data
        dispatch(
          showNotification({
            type: 'error',
            message: `Calisanlar listelenirken hata ile karsilandi`,
          })
        )
      })
  }

  const handleClose = () => setShow(false)

  return (
    <div className='card'>
      <div className='card-header'>
        <h1 className='card-title fw-bold'>Calisanlar</h1>
        <div
          className='btn btn-primary align-self-center'
          onClick={() => {
            setExit(false)
            setShow(true)
          }}
        >
          Calisan Ekle
        </div>
      </div>
      <div className='card-body py-5'>
        <EmployeeListTable fetchAllEmployee={fetchAllEmployee} employeeList={employeeList} />
      </div>
      {!isExit && (
        <CreateModal
          fetchAllEmployee={fetchAllEmployee}
          handleClose={handleClose}
          show={show}
          handleExit={() => setExit(true)}
        />
      )}
    </div>
  )
}

export default CustomerAppointment
