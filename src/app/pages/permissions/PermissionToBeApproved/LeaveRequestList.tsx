import moment from 'moment'
import '../RequestApprovalPage.css'
import { ILeaveRequest } from '../PermissionPage'

type Props = {
  leaveRequests: ILeaveRequest[]
  showClicked: (id: string, name: string) => void
  getBy: string
}

function LeaveRequestList({ leaveRequests, showClicked, getBy }: Props) {
  return (
    <tbody>
      {leaveRequests.map((current: ILeaveRequest) => {
        console.log("Test Alani => ",leaveRequests);
        if (current.approverState === getBy) {
          return (
            <tr role='button' key={current.id} onClick={() => showClicked(current.id, current.name)}>
              <td className='text-dark fw-bold'>{current.name}</td>
              <td>{current.totalDays}</td>
              <td>{moment(current.startDate).format('YYYY-MM-DD')}</td>
              <td>{moment(current.endDate).format('YYYY-MM-DD')}</td>
              <td>{current.description}</td>
              <td>{current.approvalProcessName}</td>
              <td>
                <span
                  className={
                    'sizeList badge badge-light-' +
                    (current.approvalState == 'Onaylandı'
                      ? 'success'
                      : current.approvalState == 'Bekleniyor'
                        ? 'warning'
                        : 'danger')
                  }
                >
                  {current.approvalState}
                </span>
              </td>
            </tr>
          )
        }
        return null;
      })}
    </tbody>
  )
}

export default LeaveRequestList
