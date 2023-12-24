import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import LeaveRequestList from './LeaveRequestList'
import RequestApprovalPage from './RequestApprovalPage'
import HttpService from '../../../services/HttpService'
import { ILeaveRequest } from '../PermissionPage'

type Props = {
  leaveRequests: ILeaveRequest[]
  getAllLeaveRequest: () => void
  getBy: string;
}

export default function PermissionRoute({ leaveRequests, getAllLeaveRequest, getBy }: Props) {
  //const [leaveRequests, setLeaveRequests] = useState<ILeaveRequest[]>([]);
  const [show, setShow] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')

  function showClicked(id: string, name: string) {
    setId(id)
    setName(name)
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }
  return (
    <table className='table table-row-bordered table-row-gray-10 align-middle gs-0 gy-3'>
      {/*table align-middle gs-0 gy-3 */}
      <thead>
        <tr className='fw-bold text-muted'>
          <th className='min-w-100px'>Isim</th>
          <th className='min-w-30px'>Toplam Gün</th>
          <th className='min-w-60px'>Başlangıç</th>
          <th className='min-w-60px'>Bitiş</th>
          <th className='min-w-200px'>Açıklama</th>
          <th className='min-w-60px'>Onay Sureci Ismi</th>
          <th className='min-w-50px'>Durumu</th>
        </tr>
      </thead>
      <LeaveRequestList
        leaveRequests={leaveRequests}
        showClicked={showClicked}
        getBy={getBy}
      />
      {id && <RequestApprovalPage
        refreshData={getAllLeaveRequest}
        id={id}
        name={name}
        show={show}
        handleClose={handleClose}
      />}
    </table>
  )
}
