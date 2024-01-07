import moment from 'moment/moment'
import React, {useState} from 'react'
import UpdateModal from '../update/UpdateModal'
import {Brand, Vehicle} from '../../MyCarsPage'
import HttpService from '../../../../services/HttpService'
import {showNotification} from '../../../../actions/notificationAction'
import {useDispatch} from 'react-redux'
import Swal, {SweetAlertResult} from 'sweetalert2'

type Params = {
  vehicle: Vehicle
  brands: Brand[]
  fetchAllVehicle:() => void
}

const MyCarListTableBody = ({vehicle, brands,fetchAllVehicle}: Params) => {
  const [show, setShow] = useState(false)
  const [isExit, setExit] = useState(true)

  const dispatch = useDispatch()

  const defaultDate = '0001-01-01T00:00:00'
  const haveLastWash =
    moment(vehicle.lastWashDate).format('YYYY-MM-DD') === moment(defaultDate).format('YYYY-MM-DD')
  const handleClose = () => {
    setShow(false)
  }

  const deleteHandler = async () => {
    const result: SweetAlertResult = await Swal.fire({
      title: 'Silmek istediginizden emin misiniz',
      text: 'Bu islem geri alinamaz!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet. Sil',
      confirmButtonColor: '#f1416c',
      cancelButtonText: 'Iptal et!',
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      deleteVehicle()
    }
  }
  const deleteVehicle = () => {
    HttpService.delete(`Vehicle/delete/${vehicle.id}`)
      .then(() => {
        Swal.fire('Silindi!', 'Arac basarili bir sekilde silindi.', 'success')
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
      })
  }



  return (
    <tr key={vehicle.id}>
      <td>{vehicle.plateNumber}</td>
      <td>{vehicle.brand.name}</td>
      <td>{vehicle.model}</td>
      <td>
        {haveLastWash ? 'Henuz Yikanmadi' : moment(vehicle.lastWashDate).format('YYYY-MM-DD')}
      </td>
      <td>
        <div className='d-flex justify-content-center'>
          <button
            className='btn btn-secondary me-2'
            onClick={() => {
              setExit(false)
              setShow(true)
            }}
          >
            Duzenle
          </button>
          <button className='btn btn-danger' onClick={deleteHandler}>
            Sil
          </button>
        </div>
      </td>
      {!isExit && (
        <UpdateModal
          show={show}
          handleClose={handleClose}
          handleExit={() => setExit(true)}
          vehicle={vehicle}
          brands={brands}
          fetchAllVehicle={fetchAllVehicle}
        />
      )}
    </tr>
  )
}

export default MyCarListTableBody
