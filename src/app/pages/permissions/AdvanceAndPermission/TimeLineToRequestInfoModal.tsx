import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Cookies from 'js-cookie'
import '../RequestApprovalPage.css'
import HttpService from '../../../services/HttpService'
import { KTSVG } from '../../../../_metronic/helpers'

type Props = {
  id: string
  show: boolean
  handleClose: () => void
  state: string
}

interface IUserQueues {
  approverName: string
  description: string
  queue: number
  requestType: string
  approvalState: string
}

const TimeLineToRequestInfoModal = ({ show, handleClose, state, id }: Props) => {
  const [userQueues, setUserQueue] = useState<IUserQueues[]>([])
  useEffect(() => {
    HttpService.get(`RequestApprovals/approvalDetailEmployee/${id}`, Cookies.get('authToken'))
      .then((response) => {
        setUserQueue(response.data)
      })
      .then(() => {
        console.log('veri geldi')
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <Modal
      id='create_employee_modal'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-600px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      {/* HEAD */}
      <div className='card card-xl-stretch'>
        <div className='card-header border-0'>
          <h3 className='card-title fw-bold text-dark'>Talep Onay Süreci</h3>
          <div className='card-toolbar'>
            {/* BUTTON */}
            <button
              type='button'
              className='btn btn-sm btn-icon btn-color-danger btn-active-light-danger'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <KTSVG path='/media/icons/duotune/general/gen012.svg' className='svg-icon-2' />
            </button>
            {/* <button type='button' className='btn-close' onClick={handleClose}></button> */}
          </div>
        </div>
        <div className='card-body form-control'>
          {Array.from({ length: userQueues.length }).map((_, index) =>
            userQueues.map((user) => {
              if (user.queue === index + 1) {
                const wait = user.approvalState === 'Bekleniyor'
                const approval = user.approvalState === 'Onaylandı'
                const notForwarded = user.approvalState === 'İletilmedi'
                return (
                  <div
                    className={
                      `d-flex bg-light-` +
                      (wait ? `warning` : approval ? `success` : notForwarded ? `dark` : `danger`) +
                      ` rounded border-primary p-6 mb-5 col-md-12`
                    }
                  >
                    <span className='svg-icon svg-icon-warning me-5'>
                      <KTSVG
                        path='/media/icons/duotune/abstract/abs027.svg'
                        className='svg-icon-1'
                      />
                    </span>
                    <div className='flex-grow-1 me-2'>
                      <h1 className='fw-bold text-gray-800 fs-6'>{user.approverName}</h1>
                      <div className='text-gray-600 fs-6'>
                        <span className='fw-bold text-gray-600'>Açıklama: </span>
                        {user.description}
                      </div>
                    </div>
                    <span
                      className={
                        `sizeList badge ` +
                        (notForwarded ? `text-gray-600` : ``) +
                        ` badge-light-` +
                        (wait ? `warning` : approval ? `success` : notForwarded ? `dark` : `danger`)
                      }
                    >
                      {user.approvalState}
                    </span>
                  </div>
                )
              }
            })
          )}
        </div>
        <div className='card-footer d-flex justify-content-center form-control'>
          <span
            className={
              'sizeList badge badge-light-' +
              (state == 'Onaylandı' ? 'success' : state == 'Bekleniyor' ? 'warning' : 'danger')
            }
          >
            {state}...
          </span>
        </div>
      </div>
    </Modal>
  )
}

export { TimeLineToRequestInfoModal }
