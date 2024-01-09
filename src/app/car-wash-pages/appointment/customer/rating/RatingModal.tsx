import {Modal} from 'react-bootstrap'
import moment from 'moment'
import React, {useState} from 'react'
import {Rating} from '@mui/material'
import Cookies, {set} from 'js-cookie'
import {AppointmentList} from '../CustomerAppointment'
import HttpService from '../../../../services/HttpService'
import {showNotification} from '../../../../actions/notificationAction'
import {useDispatch} from 'react-redux'

type Params = {
  show: boolean
  handleClose: () => void
  appointment: AppointmentList
  fetchAllAppointment: () => void
}

interface ServiceView {
  id: number
  rating: number | null
  comment: string
}

const RatingModal = ({show, handleClose, fetchAllAppointment, appointment}: Params) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [serviceReview, setServiceReview] = useState<ServiceView>({
    id: appointment.id,
    rating: 0,
    comment: '',
  })

  const updateFields = (field: Partial<ServiceView>) => {
    const updated = {...serviceReview, ...field}
    setServiceReview(updated)
  }

  const createServiceReview = () => {
    setLoading(true)
    HttpService.post('Appointmets/createReview', serviceReview, Cookies.get('authToken'))
      .then(() => {
        handleClose()
        dispatch(
          showNotification({
            type: 'success',
            message: `Oylama basarili bir sekilde yapildi`,
          })
        )
        fetchAllAppointment()
      })
      .catch((err) => {
        const data = err.response.data
        dispatch(
          showNotification({
            type: 'error',
            message: `${data.messages}`,
          })
        )
        setLoading(false)
      })
  }

  // @ts-ignore
  return (
    <Modal
      id='create_position_modal'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-500px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header d-flex justify-content-center'>
        <h3 className='modal-title'>PUANLA</h3>
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <div className='row g-5'>
          <div className='col-md-12'>
            <div className='input-group'>
              <label className='input-group-text fw-bold'>{'PLAKA:'}</label>
              <input
                type='text'
                className='form-control'
                name='plaka'
                disabled
                value={appointment.vehicle.plateNumber}
              />
            </div>
          </div>
          <div className='col-md-12'>
            <div className='input-group'>
              <label className='input-group-text fw-bold'>{'PAKET:'}</label>
              <input
                type='text'
                className='form-control'
                name='paket'
                disabled
                value={appointment.packageName.toUpperCase()}
              />
            </div>
          </div>
          <div className='col-md-12'>
            <div className='input-group'>
              <label className='input-group-text fw-bold'>{'YIKANMA TARIHI:'}</label>
              <input
                type='date'
                className='form-control'
                name='tarih'
                value={moment(appointment.appointmentDate).format('YYYY-MM-DD')}
                disabled
              />
            </div>
          </div>

          <div className='col-md-12'>
            <label className='form-label'>Yorum</label>
            <textarea
              rows={2}
              className='form-control'
              name='yorum'
              value={serviceReview.comment}
              onChange={(e) => updateFields({comment: e.target.value})}
            />
          </div>
          <div className='col-md-12'>
            <label className='form-label d-flex justify-content-center'>Puanla</label>
            <div className='d-grid justify-content-center'>
              <Rating
                size='large'
                name='simple-controlled'
                value={serviceReview.rating}
                onChange={(event, newValue) => updateFields({rating: newValue})}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='modal-footer d-flex justify-content-center'>
        <button type='button' className='btn btn-secondary' onClick={createServiceReview}>
          {!loading && <span className='indicator-label'>GONDER</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Lütfen bekleyin...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </Modal>
  )
}

export default RatingModal
