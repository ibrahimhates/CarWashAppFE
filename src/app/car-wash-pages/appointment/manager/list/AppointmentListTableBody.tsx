import moment from 'moment'
import React, {useState} from 'react'
import '../../Appointment.css'
import {AppointmentList, CarWashStatus} from '../../customer/CustomerAppointment'
import {Rating} from '@mui/material'


type Props ={
  appointment:AppointmentList
}
const AppointmentListTableBody = ({appointment}:Props) => {

  return (
    <tr key={appointment.id}>
      <td>{appointment.vehicle.plateNumber}</td>
      <td>{appointment.vehicle.brand.name}</td>
      <td>{appointment.vehicle.model}</td>
      <td>{appointment.packageName}</td>
      <td>{appointment.carWashStatus === CarWashStatus.Waiting ? "Bekliyor" : "Islemde"}</td>
      <td>{moment(appointment.appointmentDate).format('YYYY-MM-DD')}</td>
      <td>
        {appointment.rating ? (
          <Rating size='large' name='simple-controlled' value={appointment.rating} readOnly />
        ) : (
          <span>{'-'}</span>
        )}
      </td>
    </tr>
  )
}

export default AppointmentListTableBody
