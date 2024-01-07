import {Rating} from '@mui/material'
import React, {useState} from 'react'
import RatingDetailModal from '../detail/RatingDetailModal'

type Props = {
  id: string
}

const ReportListTableBody = ({id}: Props) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const [report, setReport] = useState({
    calisanAdi: 'Ibrahim Halil Ates',
    haftalikGelir: 322.45,
    aylikGelir: 2344.44,
    genelPuan: 3.1,
  })

  return (
    <tr key={id}>
      <td>{report.calisanAdi}</td>
      <td>{report.haftalikGelir + ` TL`}</td>
      <td>{report.aylikGelir + ` TL`}</td>
      <td>
        {report.genelPuan !== 0 ? (
          <div className='d-inline-flex align-items-center'>
            <Rating size='large' name='simple-controlled' value={report.genelPuan} readOnly />
            <h3 className='fw-bold mt-3 ms-5'>{`${report.genelPuan}`}</h3>
          </div>
        ) : (
          <span>{'-'}</span>
        )}
      </td>
      <td>
        <div className='d-flex justify-content-center'>
          <button disabled={false} className='btn btn-primary' onClick={() => setShow(true)}>
            Detay
          </button>
        </div>
      </td>
      <RatingDetailModal handleClose={handleClose} show={show} />
    </tr>
  )
}

export default ReportListTableBody
