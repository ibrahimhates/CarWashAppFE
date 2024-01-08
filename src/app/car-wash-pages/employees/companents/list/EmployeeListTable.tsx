import React, {useEffect, useState} from 'react'
import EmployeeListTableBody from './EmployeeListTableBody'
import {EmployeeList} from '../Employee'

type Props = {
  employeeList:EmployeeList[]
  fetchAllEmployee:() => void
}
const EmployeeListTable = ({employeeList,fetchAllEmployee}:Props) => {

  useEffect(() => fetchAllEmployee(),[])

  return (
    <table className='table table-row-bordered table-row-gray-10 align-middle gs-0 gy-3'>
      <thead>
        <tr className='fw-bold text-muted'>
          <th className='min-w-60px'>Ad Soyad</th>
          <th className='min-w-60px'>Posizyon</th>
          <th className='min-w-60px'>Giris Tarihi</th>
        </tr>
      </thead>
      <tbody>
      {
        employeeList.map((emp) => {
          return(
            <EmployeeListTableBody employee={emp} />
          )
        })
      }
      </tbody>
    </table>
  )
}

export default EmployeeListTable
