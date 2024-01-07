import {Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle} from 'react-bootstrap'
import moment from 'moment'
import {useEffect, useState} from 'react'
import HttpService from '../../../../services/HttpService'
import Cookies from 'js-cookie'
import {useDispatch} from 'react-redux'
import {showNotification} from '../../../../actions/notificationAction'
import {customJwtDecode} from '../../../../CustomJwt'
import {Brand, Decode} from '../../MyCarsPage'

type Params = {
  show: boolean
  handleClose: () => void
  handleExit:() => void
  fetchAllVehicle:() => void
  brands:Brand[]
}

interface VehicleCreate {
  brandId: number
  customerId: number
  model: number
  plateNumber: string
}

const CreateModal = ({show, handleClose,handleExit,brands,fetchAllVehicle}: Params) => {

  const [loading, setLoading] = useState(false)
  const [isValid, setValid] = useState(false)

  const token: any = Cookies.get('authToken')
  const user: Decode = customJwtDecode(token)
  const dispatch = useDispatch()

  const [vehicle, setVehicle] = useState<VehicleCreate>({
    brandId: 0,
    customerId: user.userid,
    model: 0,
    plateNumber: '',
  })

  const updateVehicle = (field: Partial<VehicleCreate>) => {
    const updated = {...vehicle, ...field}
    setVehicle(updated)
  }

  const handleCreateVehicle = () => {
    setLoading(true)
    setValid(true)
    HttpService.post('Vehicle/create', vehicle)
      .then(() => {
        handleClose()
        dispatch(
          showNotification({
            type: 'success',
            message: `Ekleme islemi basarili bir sekilde gerceklestirildi`,
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

  useEffect(() => {
    console.log(vehicle)
  }, [vehicle])

  useEffect(() => {
    if (!loading) {
      if (vehicle.model === 0 || vehicle.plateNumber === '' || vehicle.brandId === 0) setValid(true)
      else setValid(false)
    }
  })

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
              name='TotalDays'
              value={vehicle.plateNumber}
              onChange={(e) => updateVehicle({plateNumber: e.target.value})}
            />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Marka</label>
            <select
              className='form-select'
              name='arac'
              onChange={(e) => updateVehicle({brandId: parseInt(e.target.value)})}
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
              name='TotalDays'
              value={vehicle.model}
              onChange={(e) => updateVehicle({model: parseInt(e.target.value)})}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className='justify-content-center'>
        <button
          disabled={isValid}
          type='button'
          className='btn btn-primary'
          onClick={handleCreateVehicle}
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

export default CreateModal
