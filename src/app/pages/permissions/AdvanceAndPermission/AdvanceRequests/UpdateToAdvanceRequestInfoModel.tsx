import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import { IAdvanceRequestForEmp } from '../../PermissionPage'
import { useAuth } from '../../../../modules/auth'


interface IPersonalInfoAdvanceRequest {
    id: string
    approvalState: string
    amount: number
    description?: string
    deliveryDate: string
    userId?: string
}

type Props = {
  show: boolean
  handleClose: () => void
  updatedData: IAdvanceRequestForEmp
}

const UpdateToAdvanceRequestInfoModel = ({ show, handleClose, updatedData }: Props) => {
  const { currentUser } = useAuth()
  const [requestData, setRequestData] = useState<IPersonalInfoAdvanceRequest>({
    approvalState: updatedData.approvalState,
    amount: updatedData.amount,
    description: updatedData.description,
    deliveryDate: updatedData.deliveryDate,
    id: updatedData.id,
    userId: currentUser?.id,
  })

  const updateLeaveRequestDatas = (fieldsToUpdate: Partial<IPersonalInfoAdvanceRequest>) => {
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
        <h2 className='modal-title'>Avans Duzenleme</h2>
      </div>

      <div className='modal-body'>
        <div className='row g-5'>
          <div className='col-md-6'>
            <div className='mb-5'>
              <label className='form-label'>approvalState</label>
              <input
                type='text'
                className='form-control'
                name='TotalDays'
                value={requestData.approvalState}
                //onChange={(e) => updateLeaveRequestDatas({ totalDay: e.target.valueAsNumber })}
                readOnly
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-5'>
              <label className='form-label'>amount</label>
              <input
                type='date'
                className='form-control'
                name='DeliveryDate'
                value={requestData.amount}
                //value={moment(requestData.amount).format('YYYY-MM-DD')}
                //onChange={(e) => updateLeaveRequestDatas({ startDate: e.target.value })}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-5'>
              <label className='form-label'>deliveryDate</label>
              <input
                type='date'
                className='form-control'
                name='DeliveryDate'
                value={moment(requestData.deliveryDate).format('YYYY-MM-DD')}
                onChange={(e) => updateLeaveRequestDatas({ deliveryDate: e.target.value })}
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

export { UpdateToAdvanceRequestInfoModel }
