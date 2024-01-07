import ReportListTableBody from '../../list/ReportListTableBody'
import React, {useState} from 'react'
import RatingDetailListTableBody from './RatingDetailListTableBody'
import {Rating} from '@mui/material'

const RatingDetailListTable  = ()=> {
  return (
    <table className='table table-row-bordered table-row-gray-10 align-middle gs-0 gy-3'>
      <thead>
      <tr className='fw-bold text-muted'>
        <th className='min-w-60px'>Musteri Ad</th>
        <th className='min-w-60px'>Arac Plaka</th>
        <th className='min-w-60px'>Paket</th>
        <th className='min-w-60px'>Fiyat</th>
        <th className='min-w-60px'>Yorum</th>
        <th className='min-w-60px'>Puan</th>
      </tr>
      </thead>
      <tbody>
      <RatingDetailListTableBody id={crypto.randomUUID()} />
      </tbody>
    </table>
  )
}


export default RatingDetailListTable;