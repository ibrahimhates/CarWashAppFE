import {Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from 'react-bootstrap'
import {Brand, Decode, Vehicle} from '../../MyCarsPage'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {customJwtDecode} from '../../../../CustomJwt'
import {useDispatch} from 'react-redux'
import HttpService from '../../../../services/HttpService'
import {showNotification} from '../../../../actions/notificationAction'

type Params = {
  show: boolean
  handleClose: () => void
  handleExit: () => void
  fetchAllVehicle:() => void
  vehicle: Vehicle
  brands: Brand[]
}

interface VehicleUpdate {
  brandId: number
  customerId: number
  model: number
  plateNumber: string
  id: number
}

const UpdateModal = ({show, handleClose, handleExit,fetchAllVehicle, vehicle, brands}: Params) => {
  const [loading, setLoading] = useState(false)
  const [isValid, setValid] = useState(false)

  const token: any = Cookies.get('authToken')
  const user: Decode = customJwtDecode(token)
  const dispatch = useDispatch()

  const [updateVehicle, setVehicle] = useState<VehicleUpdate>({
    brandId: vehicle.brandId,
    customerId: user.userid,
    model: vehicle.model,
    plateNumber: vehicle.plateNumber,
    id: vehicle.id,
  })

  const updateFields = (fields: Partial<VehicleUpdate>) => {
    const updated = {...updateVehicle, ...fields}
    setVehicle(updated)
  }

  useEffect(() => {
    if (!loading) {
      if (vehicle.model === 0 || vehicle.plateNumber === '' || vehicle.brandId === 0) setValid(true)
      else setValid(false)
    }
  })

  const handleUpdateVehicle = () => {
    setLoading(true)
    setValid(true)
    HttpService.put(`Vehicle/update`, updateVehicle)
      .then(() => {
        handleClose()
        dispatch(
          showNotification({
            type: 'success',
            message: `Guncelleme islemi basarili bir sekilde gerceklestirildi`,
          })
        )
        fetchAllVehicle();
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
      onExited={handleExit}
      backdrop={true}
    >
      <ModalHeader className='justify-content-center'>
        <ModalTitle>Arac Ekle</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className='row g-5'>
          <div className='col-md-12'>
            <label className='form-label'>Plaka</label>
            <input
              type='text'
              className='form-control'
              value={updateVehicle.plateNumber}
              name='plaka'
              onChange={(e) => updateFields({plateNumber: e.target.value})}
            />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Marka</label>
            <select
              className='form-select'
              name='marka'
              value={updateVehicle.brandId}
              onChange={(e) => updateFields({brandId: parseInt(e.target.value)})}
            >
              <option value={0} selected>
                Lutfen Arac seciniz
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Model</label>
            <input
              type='number'
              className='form-control'
              name='model'
              value={updateVehicle.model}
              onChange={(e) => updateFields({model: parseInt(e.target.value)})}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className='justify-content-center'>
        <button
          disabled={isValid}
          type='button'
          className='btn btn-primary'
          onClick={handleUpdateVehicle}
        >
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

export default UpdateModal
