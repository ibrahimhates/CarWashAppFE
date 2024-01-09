import React, {useState} from 'react'
import AppointmentListTableBody from './AppointmentListTableBody'
import {AppointmentList} from '../../customer/CustomerAppointment'

type Props = {
  appointmentList:AppointmentList[]
}

const AppointmentListTable = ({appointmentList}:Props) => {


  return (
    <table className='table table-row-bordered table-row-gray-10 align-middle gs-0 gy-3'>
      <thead>
        <tr className='fw-bold text-muted'>
          <th className='min-w-60px'>Plaka</th>
          <th className='min-w-60px'>Marka</th>
          <th className='min-w-60px'>Model</th>
          <th className='min-w-60px'>Paket</th>
          <th className='min-w-60px'>Durumu</th>
          <th className='min-w-60px'>Yikama Tarihi</th>
          <th className='min-w-60px'>Puan</th>
        </tr>
      </thead>
      <tbody>
      {
        appointmentList.map((appointment) => {
          return(
            <AppointmentListTableBody appointment={appointment} />
          )
        })
      }
      </tbody>
    </table>
  )
}

export default AppointmentListTable
