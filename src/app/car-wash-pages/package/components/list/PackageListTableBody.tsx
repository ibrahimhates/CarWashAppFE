import React from 'react'
import {WashPackage} from '../Package'
import Swal, {SweetAlertResult} from 'sweetalert2'
import HttpService from '../../../../services/HttpService'
import {useDispatch} from 'react-redux'
import {showNotification} from '../../../../actions/notificationAction'

export interface Arac {
  paketAd: string
  aciklama: string
  sure: string
  fiyat: string
}

type Props = {
  wash: WashPackage
  fetchAllPackage:() => void
}

const PackageListTableBody = ({wash,fetchAllPackage}: Props) => {
  const dispatch = useDispatch()
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
    HttpService.delete(`Washes/delete?id=${wash.id}`)
      .then(() => {
        Swal.fire('Silindi!', 'Paket basarili bir sekilde silindi.', 'success')
        fetchAllPackage();
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
    <tr key={wash.id}>
      <td className='fw-bold'>{wash.packageName}</td>
      <td>{wash.description}</td>
      <td>{`${wash.duration} DK`}</td>
      <td>{`${wash.price} TL`}</td>
      <td>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-danger' onClick={() => deleteHandler()}>
            Sil
          </button>
        </div>
      </td>
    </tr>
  )
}

export default PackageListTableBody
