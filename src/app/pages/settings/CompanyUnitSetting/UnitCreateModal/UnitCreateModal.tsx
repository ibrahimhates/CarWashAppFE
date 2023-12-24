import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'
import HttpService from '../../../../services/HttpService'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { showNotification } from '../../../../actions/notificationAction'

type Props = {
  show: boolean
  handleClose: () => void
  companyId: string
  title: string
  unitTypeId: string
}

interface IUnit {
  name: string
  isActive: boolean
  companyId: string
  unitTypeId: string
}

const modalsRoot = document.getElementById('root-modals') || document.body

const UnitCreateModal = ({ show, handleClose, title, companyId, unitTypeId }: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [unit, setUnit] = useState<IUnit>({
    name: '',
    isActive: true,
    companyId: companyId,
    unitTypeId: unitTypeId,
  })

  const updateDatas = (fields: Partial<IUnit>) => {
    const updatedUnit = { ...unit, ...fields }
    setUnit(updatedUnit)
  }

  const createUnitFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUnit()
  }

  const createUnit = () => {
    setLoading(true);
    HttpService.post(`Units/create`, unit, Cookies.get('authToken'))
      .then(() => {
        setLoading(false);
      })
      .then(() => {
        handleClose();
        dispatch(showNotification({ type: 'success', message: 'Birim basarili bir sekilde olusturuldu' }))
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
        dispatch(showNotification({ type: 'error', message: 'Birim olusturulurken hata ile karsilandi' }))
      })
  }

  return createPortal(
    <Modal
      id={`create_unit_modal`}
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-500px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>{title}</h2>
      </div>
      <div className='modal-body py-lg-10 px-lg-10'>
        <form id='create_unit_form' onSubmit={createUnitFormSubmit}>
          <div className='row g-5'>
            <div className='col-xl-12'>
              <div className='fv-row mb-10'>
                <label className=' fw-bold fs-6 mb-2'>Birim Adı</label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  placeholder='Birim Adı'
                  name='name'
                  value={unit.name}
                  onChange={(e) => updateDatas({ name: e.target.value })}
                />
              </div>
            </div>
            <div className='col-xl-2'>
              <div className='form-switch form-switch-sm form-check-custom'>
                <input
                  className='form-check-input w-50px h-25px'
                  type='checkbox'
                  name='notifications'
                  checked={unit.isActive}
                  onChange={() => updateDatas({ isActive: !unit.isActive })}
                />
                <label className='form-check-label'>{unit.isActive ? 'Aktif' : 'Pasif'}</label>
              </div>
            </div>

            <div className='d-flex justify-content-end'>
              <button type='button' className='btn btn-danger me-3' onClick={handleClose}>
                İptal Et
              </button>
              <button type='submit' className='btn btn-primary'>
                {!loading && <span className='indicator-label'>Oluştur</span>}
                {loading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    Lütfen bekleyin...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>,
    modalsRoot
  )
}

export default UnitCreateModal
