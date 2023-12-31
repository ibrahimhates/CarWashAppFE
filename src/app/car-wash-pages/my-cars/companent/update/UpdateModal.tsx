import {Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from 'react-bootstrap'

type Params = {
  show: boolean
  handleClose: () => void
  arac:Test
}

export interface Test{
  plaka:string;
  marka:string;
  model:string;
}
const UpdateModal = ({show, handleClose,arac}: Params) => {

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
            <input type='text' className='form-control' value={arac.plaka} name='TotalDays' />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Marka</label>
            <select className='form-select' name='arac' value={arac.marka} onChange={(e) => {}}>
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
              <option key={3} value={'Hyundai'}>
                Hyundai
              </option>
            </select>
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Model</label>
            <input type='text' className='form-control' name='TotalDays' value={arac.model} />
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

export default UpdateModal
