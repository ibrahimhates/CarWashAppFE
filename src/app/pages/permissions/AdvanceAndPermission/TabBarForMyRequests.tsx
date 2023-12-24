import Cookies from 'js-cookie'
import HttpService from '../../../services/HttpService'
import {IAdvanceRequestForEmp, ILeaveRequest, ILeaveRequestForEmp} from '../PermissionPage'
import AdvanceRequestList from './AdvanceRequests/AdvanceRequestList'
import LeaveRequestListForMyPermission from './MyPermission/LeaveRequestListForMyPermission'
import {useEffect} from 'react'

type Props = {
  leaveRequests: ILeaveRequestForEmp[]
  advanceRequests: IAdvanceRequestForEmp[]
  setLeaveRequests: (all: ILeaveRequestForEmp[]) => void
  setAdvanceRequests: (all: IAdvanceRequestForEmp[]) => void
}

const TabBarForMyRequests = ({leaveRequests, setLeaveRequests,advanceRequests,setAdvanceRequests}: Props) => {
  const getAllLeaveRequestForEmployee = () => {
    HttpService.get('LeaveRequest/allEmployee', Cookies.get('authToken'))
      .then((response) => {
        setLeaveRequests(response.data)
        console.log('verileriin gelmis olmasi lazim', response.data)
      })
      .then(() => {
        console.log('veri geldi')
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const getAllAdvanceRequestForEmployee = () => {
    HttpService.get('AdvanceRequest/allEmployee', Cookies.get('authToken'))
      .then((response) => {
        setAdvanceRequests(response.data)
        console.log('verileriin gelmis olmasi lazim', response.data)
      })
      .then(() => {
        console.log('veri geldi')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getAllLeaveRequestForEmployee()
    getAllAdvanceRequestForEmployee()
  }, [])

  return (
    <div className={`card card-xl-stretch mb-xl-8rd`}>
      <div className='card-header border-1'>
        <div className='card-toolbar'>
          <ul className='nav'>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-color-muted btn-active btn-active-secondary active fw-bold px-4 me-1'
                data-bs-toggle='tab'
                href='#tab_1'
              >
                Izin Taleplerim
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-color-muted btn-active btn-active-secondary fw-bold px-4 me-1'
                data-bs-toggle='tab'
                href='#tab_2'
              >
                Avans Taleplerim
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='card-body py-3'>
        <div className='tab-content'>
          <div className='tab-pane fade show active' id='tab_1'>
            <div className='table-responsive'>
              <LeaveRequestListForMyPermission leaveRequests={leaveRequests} />
            </div>
          </div>
          <div className='tab-pane fade' id='tab_2'>
            <div className='table-responsive'>
              <AdvanceRequestList advanceRequests={advanceRequests}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabBarForMyRequests
