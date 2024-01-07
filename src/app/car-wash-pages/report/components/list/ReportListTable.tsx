import AppointmentListTableBody from '../../../appointment/customer/list/AppointmentListTableBody'
import React from 'react'
import ReportListTableBody from './ReportListTableBody'

const ReportListTable  = ()=> {
  return (
    <table className='table table-row-bordered table-row-gray-10 align-middle gs-0 gy-3'>
      <thead>
      <tr className='fw-bold text-muted'>
        <th className='min-w-60px'>Calisan Ad</th>
        <th className='min-w-60px'>Haftalik Gelir</th>
        <th className='min-w-60px'>Aylik Gelir</th>
        <th className='min-w-60px'>Puan</th>
      </tr>
      </thead>
      <tbody>
        <ReportListTableBody id={crypto.randomUUID()} />
      </tbody>
    </table>
  )
}

export default ReportListTable;