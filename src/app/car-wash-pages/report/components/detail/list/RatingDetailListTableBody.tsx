import {Rating} from '@mui/material'
import RatingDetailModal from '../RatingDetailModal'
import React, {useState} from 'react'

type Props = {
  id: string
}
const RatingDetailListTableBody = ({id}: Props) => {
  const [report, setReport] = useState({
    musteriAdi: 'Ahmet ***',
    aracPlaka: '34 RC 234',
    paket: 'Sadece Ic',
    fiyat: 230.45,
    yorum: 'Mukemmel Yikadi',
    puan: 3,
  })

  return (
    <tr key={id} className='bg-secondary'>
      <td>{report.musteriAdi}</td>
      <td>{report.aracPlaka}</td>
      <td>{report.paket}</td>
      <td>{report.fiyat + ` TL`}</td>
      <td>{report.yorum}</td>
      <td>
        {report.puan !== 0 ? (
          <div className='d-inline-flex align-items-center'>
            <Rating size='medium' name='simple-controlled' value={report.puan} readOnly />
          </div>
        ) : (
          <span>{'-'}</span>
        )}
      </td>
    </tr>
  )
}

export default RatingDetailListTableBody
