import moment from 'moment'
import { useState } from 'react'
import { IAdvanceRequestForEmp, ILeaveRequest, ILeaveRequestForEmp } from '../../PermissionPage'
import { KTSVG } from '../../../../../_metronic/helpers'
import { TimeLineToRequestInfoModal } from '../TimeLineToRequestInfoModal'


type Props = {
  advanceRequest: IAdvanceRequestForEmp[]
  showClicked: (id: string, state: string) => void
  showUpdateModal: (id: string) => void
}

const AdvanceRequestDataList = ({ advanceRequest, showClicked, showUpdateModal }: Props) => {


  return (
    <tbody>
      {advanceRequest.map((current) => (
        <>
          <tr key={current.id}>
            <td>{current.approvalState}</td>
            <td>{current.amount}</td>
            <td>{current.description}</td>
            <td>{current.approvalState}</td>
            <td>{moment(current.deliveryDate).format('YYYY-MM-DD')}</td>
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

export default AdvanceRequestDataList