import React, {useEffect, useState} from 'react'
import MyCarListTableBody from './MyCarListTableBody'
import HttpService from '../../../../services/HttpService'
import Cookies, {set} from 'js-cookie'
import {customJwtDecode} from '../../../../CustomJwt'
import {showNotification} from '../../../../actions/notificationAction'
import {useDispatch} from 'react-redux'
import {Brand, Vehicle} from '../../MyCarsPage'


type Props = {
  brands:Brand[]
  vehicles:Vehicle[]
  fetchAllVehicle:() => void
}

interface Decode {
  userid: number
}

function MyCarListTable({brands,vehicles,fetchAllVehicle}:Props) {

  const token: any = Cookies.get('authToken')
  const user: Decode = customJwtDecode(token)
  const dispatch = useDispatch()

  useEffect(() => fetchAllVehicle(), [])

  return (
    <table className='table table-row-bordered table-row-gray-10 align-middle gs-0 gy-3'>
      <thead>
        <tr className='fw-bold text-muted'>
          <th className='min-w-60px'>Plaka</th>
          <th className='min-w-60px'>Marka</th>
          <th className='min-w-60px'>Model</th>
          <th className='min-w-60px'>Son Yikama Tarihi</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => (
          <MyCarListTableBody vehicle={vehicle} brands={brands} fetchAllVehicle={fetchAllVehicle}/>
        ))}
      </tbody>
    </table>
  )
}

export default MyCarListTable
