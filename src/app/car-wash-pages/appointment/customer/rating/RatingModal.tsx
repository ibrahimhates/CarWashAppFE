import {Modal} from 'react-bootstrap'
import moment from 'moment'
import {Arac} from '../list/AppointmentListTableBody'
import React, {useState} from 'react'
import {Rating} from '@mui/material'
import {set} from 'js-cookie'

type Params = {
  show: boolean
  handleClose: () => void
  arac: Arac
  rating:number | null
  setRating:(rating:number | null ) => void
}
const RatingModal = ({show, handleClose, arac,rating,setRating}: Params) => {
  const [comment, setComment] = useState('')
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
                value={arac.plaka}
                disabled
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
                value={arac.paket}
                disabled
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
                value={moment(arac.tarih).format('YYYY-MM-DD')}
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className='col-md-12'>
            <label className='form-label d-flex justify-content-center'>Puanla</label>
            <div className='d-grid justify-content-center'>
              <Rating
                size='large'
                name='simple-controlled'
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='modal-footer d-flex justify-content-center'>
        <button type='button' className='btn btn-secondary' onClick={() => {}}>
          GONDER
        </button>
      </div>
    </Modal>
  )
}

export default RatingModal
