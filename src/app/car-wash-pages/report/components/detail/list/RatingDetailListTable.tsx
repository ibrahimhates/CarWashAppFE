import ReportListTableBody from '../../list/ReportListTableBody'
import React, {useEffect, useState} from 'react'
import RatingDetailListTableBody from './RatingDetailListTableBody'
import {Rating} from '@mui/material'
import HttpService from '../../../../../services/HttpService'
import Cookies from 'js-cookie'
import {showNotification} from '../../../../../actions/notificationAction'
import {useDispatch} from 'react-redux'

export interface EmployeeReportDetail {
  id: number
  customerName: string
  plateNumber: string
  packageName: string
  amount: number
  comment: string
  rating: number | null | undefined
}

type Props = {
  userId: number
}

const RatingDetailListTable = ({userId}: Props) => {
  const [reportDetails, setReportDetail] = useState<EmployeeReportDetail[]>([])
  const dispatch = useDispatch()
  useEffect(() => {
    HttpService.get(`Employees/reportDetails/${userId}`, Cookies.get('authToken'))
      .then((response) => {
        setReportDetail(response.data.data)
      })
      .catch((err) => {
        dispatch(
          showNotification({
            type: 'error',
            message: `Raporlar listelenirken hata olustu`,
          })
        )
      })
  }, [])

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
        {reportDetails.map((detail) => (
          <RatingDetailListTableBody detail={detail} />
        ))}
      </tbody>
    </table>
  )
}

export default RatingDetailListTable
