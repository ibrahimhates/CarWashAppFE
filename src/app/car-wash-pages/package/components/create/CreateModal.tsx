import {Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter} from 'react-bootstrap'
import React, {useState} from 'react'
import HttpService from '../../../../services/HttpService'
import {showNotification} from '../../../../actions/notificationAction'
import {useDispatch} from 'react-redux'
import Cookies from 'js-cookie'

type Props = {
  handleClose: () => void
  show: boolean
  fetchAllWashPackage: () => void
}

interface WashPackageCreate {
  packageName: string
  description: string
  price: number
  duration: number
}

const CreateModal = ({handleClose, show, fetchAllWashPackage}: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [washPackage, setWashPackage] = useState<WashPackageCreate>({
    packageName: '',
    description: '',
    price: 0,
    duration: 0,
  })

  const updateWashPackageFields = (field: Partial<WashPackageCreate>) => {
    const updated = {...washPackage, ...field}
    setWashPackage(updated)
  }

  const handleSave = () => {
    setLoading(true)
    HttpService.post('Washes/create', washPackage,Cookies.get("authToken"))
      .then(() => {
        handleClose()
        dispatch(
          showNotification({
            type: 'success',
            message: `Ekleme islemi basarili bir sekilde gerceklestirildi`,
          })
        )
        fetchAllWashPackage();
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
            <input
              type='text'
              className='form-control'
              name='name'
              value={washPackage.packageName}
              onChange={(e) => updateWashPackageFields({packageName: e.target.value})}
            />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Sure</label>
            <input
              type='number'
              className='form-control'
              name='time'
              value={washPackage.duration}
              onChange={(e) => updateWashPackageFields({duration: parseInt(e.target.value)})}
            />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Fiyat</label>
            <input
              type='number'
              step='0.01'
              min='0.00'
              className='form-control'
              name='price'
              value={washPackage.price}
              onChange={(e) => updateWashPackageFields({price:parseFloat( e.target.value)})}
            />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Yorum</label>
            <textarea
              rows={2}
              className='form-control'
              name='yorum'
              value={washPackage.description}
              onChange={(e) => updateWashPackageFields({description: e.target.value})}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className='justify-content-center'>
        <button type='button' className='btn btn-primary' onClick={handleSave}>
          {!loading && <span className='indicator-label'>KAYDET</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Lütfen bekleyin...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
