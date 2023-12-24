import moment from 'moment'
import { UpdateToPermissionInfoModal } from './UpdateToPermissionInfo/UpdateToPermissionInfoModal'
import { useState } from 'react'
import { ILeaveRequest, ILeaveRequestForEmp } from '../../PermissionPage'
import { KTSVG } from '../../../../../_metronic/helpers'
import { TimeLineToRequestInfoModal } from '../TimeLineToRequestInfoModal'
import LeaveRequestListForDetailAndUpdate from './LeaveRequestListForDetailAndUpdate'

type Props = {
  leaveRequests: ILeaveRequestForEmp[]
  showClicked: (id: string, state: string) => void
  showUpdateModal: (id: string) => void
}

const LeaveRequestDataList = ({ leaveRequests, showClicked, showUpdateModal }: Props) => {


  return (
    <tbody>
      {leaveRequests.map((current) => (
        <>
          <tr key={current.id}>
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
            <td>
              <button
                className='btn btn-icon btn-secondary me-5'
                onClick={() => showClicked(current.id, current.approvalState)}
              >
                <KTSVG
                  path='/media/icons/duotune/general/gen052.svg'
                  className='svg-icon-3 text-dark'
                />
              </button>
              {current.approvalState === 'Bekleniyor' && (
                <button
                  className='btn btn-icon btn-primary m-0'
                  onClick={() => showUpdateModal(current.id)}
                >
                  <KTSVG
                    path='/media/icons/duotune/art/art005.svg'
                    className='svg-icon-3  text-white'
                  />
                </button>
              )}
            </td>
          </tr>
        </>
      ))}
    </tbody>
  )
}

export default LeaveRequestDataList

