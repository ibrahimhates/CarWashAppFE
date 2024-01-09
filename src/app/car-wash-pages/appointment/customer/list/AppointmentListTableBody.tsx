import moment from 'moment'
import React, {useState} from 'react'
import RatingModal from '../rating/RatingModal'
import {Rating} from '@mui/material'
import {AppointmentList, CarWashStatus} from '../CustomerAppointment'
import Swal, {SweetAlertResult} from 'sweetalert2'
import HttpService from '../../../../services/HttpService'
import {useDispatch} from 'react-redux'
import {showNotification} from '../../../../actions/notificationAction'


type Props ={
  appointment:AppointmentList
  fetchAllAppointment:() => void
}
const AppointmentListTableBody = ({appointment,fetchAllAppointment} :Props) => {
  const [showUpdate,setShowUpdate] = useState(false);
  const [showRating,setShowRating] = useState(false);
  const [rating,setRating] = useState<number | null>(0)

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleCloseRatind = () => setShowRating(false);

  const dispatch = useDispatch()

  const deleteHandler = async () => {
    const result: SweetAlertResult = await Swal.fire({
      title: 'Iptal etmek istediginizden emin misiniz',
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
    HttpService.delete(`Appointmets/delete?appointmentId=${appointment.id}`)
      .then(() => {
        Swal.fire('Iptal Edildi!', 'Randevu basarili bir sekilde iptal edildi.', 'success')
        fetchAllAppointment();
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
    <tr key={appointment.id}>
      <td>{appointment.vehicle.plateNumber}</td>
      <td>{appointment.vehicle.brand.name}</td>
      <td>{appointment.vehicle.model}</td>
      <td>{appointment.packageName}</td>
      <td>{moment(appointment.appointmentDate).format('YYYY-MM-DD')}</td>
      <td>
        {appointment.rating ? (
          <Rating size='large' name='simple-controlled' value={appointment.rating} readOnly />
        ) : (
          <span>{'-'}</span>
        )}
      </td>
      <td>
        <div className='d-flex justify-content-center'>
          {appointment.carWashStatus === CarWashStatus.Waiting && (
            <>
              <button className='btn btn-danger' onClick={deleteHandler}>
                Iptal
              </button>
            </>
          )}
          {appointment.carWashStatus === CarWashStatus.InProcess && (
            <span className={'sizeList badge badge-light-warning'}>
              Yikama Isleminde
            </span>
          )}
          {appointment.carWashStatus === CarWashStatus.Complete&&(
            <button
              disabled={false}
              className='btn btn-warning'
              onClick={() => setShowRating(true)}
            >
              Puan Ver
            </button>
          )}
        </div>
      </td>
      <RatingModal
        handleClose={handleCloseRatind}
        appointment={appointment}
        show={showRating}
        fetchAllAppointment={fetchAllAppointment}
      />
    </tr>
  )
}

export default AppointmentListTableBody
