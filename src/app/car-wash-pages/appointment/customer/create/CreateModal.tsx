import {Modal} from 'react-bootstrap'
import moment from 'moment/moment'

type Params = {
  handleClose: () => void
  show: boolean
}

const CreateModal = ({handleClose, show}: Params) => {
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
        <h3>RANDEVU OLUSTUR</h3>
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <div className='row g-5'>
          <div className='col-md-12'>
            <label className='form-label'>Arac</label>
            <select className='form-select' name='arac' onChange={(e) => {
            }}>
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
          <div className='col-md-6'>
            <label className='form-label'>Tarih</label>
            <input type='date' className='form-control' name='DeliveryDate' onChange={(e) => {
            }} />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Saat</label>
            <input type='time' className='form-control' name='DeliveryDate' onChange={(e) => {
            }} />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Arac</label>
            <select className='form-select' name='paket' onChange={(e) => {
            }}>
              <option value='' selected={true}>
                Lutfen Paket seciniz
              </option>
              <option key={1} value={'icdis'}>
                IC DIS
              </option>
              <option key={2} value={'ic'}>
                IC
              </option>
              <option key={3} value={'dis'}>
                DIS
              </option>
              <option key={4} value={'icdisfull'}>
                IC DIS FUL
              </option>
              <option key={5} value={'ful'}>
                FUL
              </option>
            </select>
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Tutar</label>
            <input
              type='text'
              className='form-control'
              name='TotalDays'
              value={'120TL'}
              disabled
            />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Teslim Tarihi</label>
            <input
              type='date'
              className='form-control'
              name='TotalDays'
              value={moment('10.12.2023').format('YYYY-MM-DD')}
              disabled
            />
          </div>
        </div>
      </div>
      <div className='modal-footer d-flex justify-content-center'>
        <button type='button' className='btn btn-secondary' onClick={() => {
        }}>
          TALEBI ONAYLA
        </button>
      </div>
    </Modal>
  )
}

export default CreateModal
