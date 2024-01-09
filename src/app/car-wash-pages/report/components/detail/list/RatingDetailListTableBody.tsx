import {Rating} from '@mui/material'
import RatingDetailModal from '../RatingDetailModal'
import React, {useEffect, useState} from 'react'
import {EmployeeReportDetail} from './RatingDetailListTable'

type Props = {
  detail:EmployeeReportDetail
}
const RatingDetailListTableBody = ({detail}: Props) => {
  const nameParts = detail.customerName.split(' ');
  const [name, setName] = useState('')

  useEffect(() => {
    let maskCustomerName = ''
    for (let i = 0; i < nameParts.length; i++) {
      const maskedLastName = nameParts[i].substring(0, 2);
      maskCustomerName+= ` ${maskedLastName}***`;
    }
    setName(maskCustomerName)
  }, [])

  return (
    <tr key={detail.id} className='bg-secondary'>
      <td>{name}</td>
      <td>{detail.plateNumber}</td>
      <td>{detail.packageName}</td>
      <td>{detail.amount + ` TL`}</td>
      <td>{detail.comment}</td>
      <td>
        {detail.rating ? (
          <div className='d-inline-flex align-items-center'>
            <Rating size='medium' name='simple-controlled' value={detail.rating} readOnly />
          </div>
        ) : (
          <span>{'-'}</span>
        )}
      </td>
    </tr>
  )
}

export default RatingDetailListTableBody
