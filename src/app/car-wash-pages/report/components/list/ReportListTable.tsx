import React, {useEffect, useState} from 'react'
import ReportListTableBody from './ReportListTableBody'
import HttpService from '../../../../services/HttpService'
import Cookies from 'js-cookie'
import {showNotification} from '../../../../actions/notificationAction'
import {useDispatch} from 'react-redux'

/*
{
      "userId": 3,
      "fullName": "ibrahim ates",
      "weeklyIncome": 120,
      "monthlyIncome": 120,
      "totalScore": 4
    }
 */
export interface EmployeeReport {
  userId: number
  fullName: string
  weeklyIncome: number
  monthlyIncome: number
  totalScore: number
}

const ReportListTable = () => {
  const dispatch = useDispatch()
  const [reports, setReports] = useState<EmployeeReport[]>([])

  useEffect(() => {
    HttpService.get(`Employees/reports`, Cookies.get('authToken'))
      .then((response) => {
        setReports(response.data.data)
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
          <th className='min-w-60px'>Calisan Ad</th>
          <th className='min-w-60px'>Haftalik Gelir</th>
          <th className='min-w-60px'>Aylik Gelir</th>
          <th className='min-w-60px'>Puan</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <ReportListTableBody report={report} />
        ))}
      </tbody>
    </table>
  )
}

export default ReportListTable
