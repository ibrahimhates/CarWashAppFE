import {Rating} from '@mui/material'
import React, {useState} from 'react'
import RatingDetailModal from '../detail/RatingDetailModal'
import {EmployeeReport} from './ReportListTable'

type Props = {
  report:EmployeeReport
}

const ReportListTableBody = ({report}: Props) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)


  return (
    <tr key={report.userId}>
      <td>{report.fullName}</td>
      <td>{report.weeklyIncome + ` TL`}</td>
      <td>{report.monthlyIncome + ` TL`}</td>
      <td>
        {report.totalScore !== 0 ? (
          <div className='d-inline-flex align-items-center'>
            <Rating size='large' name='simple-controlled' value={report.totalScore} readOnly />
            <h3 className='fw-bold mt-3 ms-5'>{`${report.totalScore}`}</h3>
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
      <RatingDetailModal handleClose={handleClose} show={show} userId={report.userId} name={report.fullName}/>
    </tr>
  )
}

export default ReportListTableBody
