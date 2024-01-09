import {Modal} from 'react-bootstrap'
import moment from 'moment/moment'
import {VehicleList, WashPackageList} from '../CustomerAppointment'
import {useState} from 'react'
import {useAuth} from '../../../../modules/auth'
import {showNotification} from '../../../../actions/notificationAction'
import {useDispatch} from 'react-redux'
import HttpService from '../../../../services/HttpService'
import Cookies from 'js-cookie'

type Params = {
  handleClose: () => void
  show: boolean
  fetchAllAppointment: () => void
  vehicleList: VehicleList[]
  washPackageList: WashPackageList[]
}

interface AppointmentCreate {
  appointmentDate: string
  packageId: number
  customerId: number | undefined
  vehicleId: number
}

const CreateModal = ({
  handleClose,
  show,
  fetchAllAppointment,
  vehicleList,
  washPackageList,
}: Params) => {
  const auth = useAuth()
  const dispatch = useDispatch()
  const [appointmentCreate, setAppointmentCreate] = useState<AppointmentCreate>({
    appointmentDate: '',
    packageId: 0,
    customerId: auth.currentUser?.id,
    vehicleId: 0,
  })
  const [tempWashPackage] = useState<WashPackageList>({
    id: 0,
    packageName: '',
    duration: 0,
    price: 0,
  })

  const [loading, setLoading] = useState(false)

  const updateFields = (fields: Partial<AppointmentCreate>) => {
    const updated = {...appointmentCreate, ...fields}
    setAppointmentCreate(updated)
  }

  const getCurrentPackage = () => {
    const currentIndex = washPackageList.findIndex((x) => x.id === appointmentCreate.packageId)
    if (currentIndex !== -1) {
      return washPackageList[currentIndex]
    }
    return tempWashPackage
  }

  const checkAndCreate = () => {
    if (appointmentCreate.vehicleId === 0) {
      dispatch(
        showNotification({
          type: 'error',
          message: `Arac secmek zorundasiniz`,
        })
      )
      return
    }
    if (appointmentCreate.packageId === 0) {
      dispatch(
        showNotification({
          type: 'error',
          message: `Paket secmek zorundasiniz`,
        })
      )
      return
    }
    createAppointmentHandle()
  }

  const createAppointmentHandle = () => {
    setLoading(true)
    HttpService.post('Appointmets/createAppointment', appointmentCreate, Cookies.get('authToken'))
      .then(() => {
        handleClose()
        dispatch(
          showNotification({
            type: 'success',
            message: `Randevu basarili bir sekilde olusturuldu`,
          })
        )
        fetchAllAppointment()
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

  const dateFormat = () => {
    const dateObject = new Date(appointmentCreate.appointmentDate)

    dateObject.setMinutes(dateObject.getMinutes() + getCurrentPackage().duration)

    const formattedDate = moment(dateObject).format('YYYY-MM-DDTHH:mm')
    return formattedDate
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
        <h3>RANDEVU OLUSTUR</h3>
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <div className='row g-5'>
          <div className='col-md-12'>
            <label className='form-label'>Arac</label>
            <select
              className='form-select'
              name='arac'
              onChange={(e) => updateFields({vehicleId: parseInt(e.target.value)})}
            >
              <option value={0} selected={true}>
                Lutfen Arac seciniz
              </option>
              {vehicleList.map((item) => (
                <option key={item.id} value={item.id}>
                  {`${item.plateNumber} ${item.brandName}`}
                </option>
              ))}
            </select>
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Randevu Tarihi</label>
            <input
              type='datetime-local'
              className='form-control'
              name='randevuTarih'
              onChange={(e) => updateFields({appointmentDate: e.target.value})}
            />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Paket</label>
            <select
              className='form-select'
              name='paket'
              onChange={(e) => updateFields({packageId: parseInt(e.target.value)})}
            >
              <option value='' selected={true}>
                Lutfen Paket seciniz
              </option>
              {washPackageList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.packageName.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Tutar</label>
            <input
              type='text'
              className='form-control'
              name='price'
              value={getCurrentPackage().price}
              disabled
            />
          </div>
          <div className='col-md-12'>
            <label className='form-label'>Teslim Tarihi</label>
            <input
              type='datetime-local'
              className='form-control'
              name='TotalDays'
              value={dateFormat()}
              disabled
            />
          </div>
        </div>
      </div>
      <div className='modal-footer d-flex justify-content-center'>
        <button type='button' className='btn btn-primary' onClick={checkAndCreate}>
          {!loading && <span className='indicator-label'>TALEBI ONAYLA</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Lütfen bekleyin...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </Modal>
  )
}

export default CreateModal
