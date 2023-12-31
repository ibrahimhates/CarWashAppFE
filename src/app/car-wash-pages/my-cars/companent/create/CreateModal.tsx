import {Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle} from 'react-bootstrap'
import moment from 'moment'

type Params = {
  show: boolean
  handleClose: () => void
}
const CreateModal = ({show, handleClose}: Params) => {
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
        <ModalTitle>Arac Ekle</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className='row g-5'>
          <div className='col-md-12'>
            <label className='form-label'>Plaka</label>
            <input type='text' className='form-control' name='TotalDays' />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Marka</label>
            <select className='form-select' name='arac' onChange={(e) => {}}>
              <option value='' selected={true}>
                Lutfen Arac seciniz
              </option>
              <option key={1} value={'Bmw'}>
                BMW
              </option>
              <option key={2} value={'Audi'}>
                AUDI
              </option>
              <option key={3} value={'Tofas'}>
                TOFAS
              </option>
            </select>
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Model</label>
            <input type='text' className='form-control' name='TotalDays' />
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

export default CreateModal
