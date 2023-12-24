import moment from 'moment'
import {Modal} from 'react-bootstrap'
import {Arac} from '../list/AppointmentListTableBody'

type Params ={
  show:boolean;
  handleClose:() => void;
  arac:Arac
}
const UpdateModal = ({arac,show,handleClose}:Params) => {
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
            <select className='form-select' name='arac' value={arac.marka} onChange={(e) => {}}>
              <option key={0} value=''>
                Lutfen Arac seciniz
              </option>
              <option key={1} value={'BMW'}>
                BMW
              </option>
              <option key={2} value={'AUDI'}>
                AUDI
              </option>
              <option key={3} value={'TOFAS'}>
                TOFAS
              </option>
            </select>
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Tarih</label>
            <input type='date' className='form-control' value={moment(arac.tarih).format('YYYY-MM-DD')} name='DeliveryDate' onChange={(e) => {}} />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Saat</label>
            <input type='time' className='form-control' name='DeliveryDate' onChange={(e) => {}} />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Paket</label>
            <select className='form-select' name='paket' value={arac.paket} onChange={(e) => {}}>
              <option value='' selected={true}>
                Lutfen Paket seciniz
              </option>
              <option key={1} value={'IC DIS'}>
                IC DIS
              </option>
              <option key={2} value={'IC'}>
                IC
              </option>
              <option key={3} value={'DIS'}>
                DIS
              </option>
              <option key={4} value={'IC DIS FUL'}>
                IC DIS FUL
              </option>
              <option key={5} value={'FUL'}>
                FUL
              </option>
            </select>
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Tutar</label>
            <input type='text' className='form-control' name='TotalDays' value={'120TL'} disabled />
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
        <button type='button' className='btn btn-secondary' onClick={() => {}}>
          TALEBI ONAYLA
        </button>
      </div>
    </Modal>
  )
}

export default UpdateModal
