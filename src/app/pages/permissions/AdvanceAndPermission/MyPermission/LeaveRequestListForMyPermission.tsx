import Cookies from 'js-cookie'
import LeaveRequestDataList from './LeaveRequestDataList'
import { useEffect, useState } from 'react'
import { TimeLineToRequestInfoModal } from '../TimeLineToRequestInfoModal'
import { UpdateToPermissionInfoModal } from './UpdateToPermissionInfo/UpdateToPermissionInfoModal'
import { ILeaveRequest, ILeaveRequestForEmp } from '../../PermissionPage'

type Props = {
  leaveRequests: ILeaveRequestForEmp[]
}
const LeaveRequestListForMyPermission = ({ leaveRequests }: Props) => {
  const [showDetail, setShowDetail] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [id, setId] = useState('')
  const [state, setState] = useState('')
  const [updatedData, setUpdatedData] = useState<ILeaveRequestForEmp>()

  const handleCloseDetail = () => {
    setShowDetail(false)
  }

  const handleCloseUpdate = () => {
    setShowUpdate(false)
  }

  const showClicked = (id: string, state: string) => {
    setId(id)
    setState(state)
    setShowDetail(true)
  }

  const showUpdateModal = (id: string) => {
    setId(id)
    const edited = leaveRequests.filter((item) => item.id === id)
    setUpdatedData(edited[0])
    setShowUpdate(true)
  }

  return (
    <table className='table table-row-bordered table-row-gray-10 align-middle gs-0 gy-3'>
      <thead>
        <tr className='fw-bold text-muted'>
          <th className='min-w-30px'>Toplam Gün</th>
          <th className='min-w-60px'>Başlangıç</th>
          <th className='min-w-60px'>Bitiş</th>
          <th className='min-w-200px'>Açıklama</th>
          <th className='min-w-60px'>Onay Sureci Ismi</th>
          <th className='min-w-50px'>Durumu</th>
        </tr>
      </thead>
      <LeaveRequestDataList
        leaveRequests={leaveRequests}
        showClicked={showClicked}
        showUpdateModal={showUpdateModal}
      ></LeaveRequestDataList>
      {showDetail && <TimeLineToRequestInfoModal
        state={state}
        id={id}
        show={showDetail}
        handleClose={handleCloseDetail}
      />}
      {updatedData && (
        <UpdateToPermissionInfoModal
          updatedData={updatedData!}
          show={showUpdate}
          handleClose={handleCloseUpdate}
        />
      )}
    </table>
  )
}

export default LeaveRequestListForMyPermission