import {Modal} from 'react-bootstrap'
import moment from 'moment/moment'
import React, {useState} from 'react'

type Params = {
  handleClose: () => void
  show: boolean
}

interface passwordCheckTemp {
  password: string
  passwordCheck: string
}

const CreateModal = ({handleClose, show}: Params) => {
  const [isValid, setIsValid] = useState(false)
  const [passwrd, setPasswrd] = useState<passwordCheckTemp>({
    password: '',
    passwordCheck: '',
  })

  const updatePassword = (field: Partial<passwordCheckTemp>) => {
    const updated = {...passwrd, ...field}
    setPasswrd(updated);
    if(updated.password === updated.passwordCheck){
      setIsValid(false);
    }else
      setIsValid(true);
  }

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

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
        <h3>CALISAN EKLE</h3>
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <form onSubmit={(e) => onSave(e)}>
          {isValid && (
            <div className='col-md-12 alert alert-danger'>
              <span className='alert-text'>Sifreler uyusmuyor</span>
            </div>
          )}
          <div className='row g-5'>
            <div className='col-md-12'>
              <div className='input-group'>
                <label className='input-group-text fw-bold'>{'ADI:'}</label>
                <input type='text' className='form-control' name='ad' required />
              </div>
            </div>
            <div className='col-md-12'>
              <div className='input-group'>
                <label className='input-group-text fw-bold'>{'SOYADI:'}</label>
                <input type='text' className='form-control' name='soyad' required />
              </div>
            </div>
            <div className='col-md-12'>
              <div className='input-group'>
                <label className='input-group-text fw-bold'>{'TELEFON:'}</label>
                <input type='tel' className='form-control' name='tel' required />
              </div>
            </div>
            <div className='col-md-12'>
              <div className='input-group'>
                <label className='input-group-text fw-bold'>{'EMAIL:'}</label>
                <input type='email' className='form-control' name='email' required />
              </div>
            </div>
            <div className='col-md-12'>
              <div className={`input-group ` + (isValid && `border border-danger border-1 rounded`)}>
                <label className='input-group-text fw-bold'>{'SIFRE:'}</label>
                <input
                  type='password'
                  className='form-control'
                  name='sifre'
                  value={passwrd.password}
                  onChange={(e) => updatePassword({password: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className='col-md-12'>
              <div className={`input-group ` + (isValid && `border border-danger border-1 rounded`)}>
                <label className='input-group-text fw-bold'>{'SIFRE TEKRAR:'}</label>
                <input
                  type='password'
                  className='form-control'
                  name='sifretkr'
                  value={passwrd.passwordCheck}
                  onChange={(e) => updatePassword({passwordCheck: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className='col-md-12'>
              <label className='form-label fw-bold'>Pozisyon</label>
              <select className='form-select' name='pozisyon' onChange={(e) => {}}>
                <option value='' selected={true}>
                  Lutfen Pozisyon seciniz
                </option>
                <option key={1} value={'Bmw'}>
                  Fircaci
                </option>
                <option key={2} value={'Audi'}>
                  Bezci
                </option>
                <option key={3} value={'Tofas'}>
                  Durulamaci
                </option>
              </select>
            </div>
            <div className='col-md-12'>
              <label className='fw-bold form-label'>Rol</label>
              <select className='form-select' name='rol' onChange={(e) => {}}>
                <option value='' selected={true}>
                  Lutfen Paket seciniz
                </option>
                <option key={1} value={'icdis'}>
                  Mudur
                </option>
                <option key={2} value={'ic'}>
                  Yonetici
                </option>
                <option key={3} value={'dis'}>
                  Calisan
                </option>
              </select>
            </div>
            <button type='submit' className='btn btn-secondary'>
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CreateModal
