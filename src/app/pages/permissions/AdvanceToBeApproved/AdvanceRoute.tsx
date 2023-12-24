import { useState } from "react";
import { IAdvanceRequest, ILeaveRequest } from "../PermissionPage";
import LeaveRequestList from "../PermissionToBeApproved/LeaveRequestList";
import RequestApprovalPage from "../PermissionToBeApproved/RequestApprovalPage";
import AdvanceRequestList from "./AdvanceRequestList";

type Props = {
  advanceRequests: IAdvanceRequest[]
  getAllAdvanceRequest: () => void
  getBy: string;
}

export default function PermissionRoute({ advanceRequests, getAllAdvanceRequest, getBy }: Props) {
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
          <th className='min-w-60px'>Geri Ödeme</th>
          <th className='min-w-90px'>Miktar</th>
          <th className='min-w-200px'>Açıklama</th>
          <th className='min-w-60px'>Onay Sureci Ismi</th>
          <th className='min-w-50px'>Durumu</th>
        </tr>
      </thead>
      <AdvanceRequestList advanceRequests={advanceRequests} showClicked={showClicked} getBy={getBy} />
      {show && (
        <RequestApprovalPage
          refreshData={getAllAdvanceRequest}
          id={id}
          name={name}
          show={show}
          handleClose={handleClose}
        />
      )}
    </table>
  )
}
