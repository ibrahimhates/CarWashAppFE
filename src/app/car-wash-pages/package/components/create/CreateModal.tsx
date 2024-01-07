import {Modal,ModalHeader,ModalTitle,ModalBody,ModalFooter} from 'react-bootstrap'
import React, {useState} from 'react'

type Props = {
  handleClose:() => void;
  show : boolean
}
const CreateModal = ({handleClose,show}:Props) => {

  const [comment, setComment] = useState('')

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
      <ModalHeader className='justify-content-center'>
        <ModalTitle>PAKET EKLE</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className='row g-5'>
          <div className='col-md-12'>
            <label className='form-label'>Paket Adi</label>
            <input type='text' className='form-control' name='name' />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Sure</label>
            <input type='number' className='form-control' name='time' />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Fiyat</label>
            <input type='number' step='0.01' min='0.00' className='form-control' name='price' />
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
        </div>
      </ModalBody>
      <ModalFooter className='justify-content-center'>
        <button type='button' className='btn btn-primary' onClick={() => {}}>
          KAYDET
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal;