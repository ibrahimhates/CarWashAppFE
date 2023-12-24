import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import { ILeaveRequestForEmp } from '../../../PermissionPage'
import { useAuth } from '../../../../../modules/auth'

interface IPersonalInfoPermission {
  totalDay: number
  startDate: any
  endDate: any
  description?: string
  userId?: string
  id: string
}

type Props = {
  show: boolean
  handleClose: () => void
  updatedData: ILeaveRequestForEmp
}

const UpdateToPermissionInfoModal = ({ show, handleClose, updatedData }: Props) => {
  const { currentUser } = useAuth()
  const [requestData, setRequestData] = useState<IPersonalInfoPermission>({
    totalDay: updatedData.totalDays,
    startDate: updatedData.startDate,
    endDate: updatedData.endDate,
    description: updatedData.description,
    id: updatedData.id,
    userId: currentUser?.id,
  })

  const updateLeaveRequestDatas = (fieldsToUpdate: Partial<IPersonalInfoPermission>) => {
    const updatedData = { ...requestData, ...fieldsToUpdate }
    setRequestData(updatedData)
  }

  return (
    <Modal
      id='create_employee_modal'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-700px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2 className='modal-title'>Izin Duzenleme</h2>
      </div>

      <div className='modal-body'>
        <div className='row g-5'>
          <div className='col-md-6'>
            <div className='mb-5'>
              <label className='form-label'>Total Day</label>
              <input
                type='text'
                className='form-control'
                name='TotalDays'
                value={requestData.totalDay}
                onChange={(e) => updateLeaveRequestDatas({ totalDay: e.target.valueAsNumber })}
                readOnly
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-5'>
              <label className='form-label'>Start Date</label>
              <input
                type='date'
                className='form-control'
                name='DeliveryDate'
                value={moment(requestData.startDate).format('YYYY-MM-DD')}
                onChange={(e) => updateLeaveRequestDatas({ startDate: e.target.value })}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-5'>
              <label className='form-label'>End Date</label>
              <input
                type='date'
                className='form-control'
                name='DeliveryDate'
                value={moment(requestData.endDate).format('YYYY-MM-DD')}
                onChange={(e) => updateLeaveRequestDatas({ endDate: e.target.value })}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-5'>
              <label className='form-label'>Description</label>
              <input
                type='text'
                className='form-control'
                name='Description'
                value={requestData.description!}
                onChange={(e) => updateLeaveRequestDatas({ description: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='modal-footer d-flex justify-content-end'>
        <button type='button' className='btn btn-danger me-3' onClick={handleClose}>
          Cancel
        </button>
        <button type='button' className='btn btn-primary' onClick={() => { }}>
          Create Request Permission
        </button>
      </div>
    </Modal>
  )
}

export { UpdateToPermissionInfoModal }
