import ReportListTable from './list/ReportListTable'
import {useState} from 'react'

const Report = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  return (
    <div className='card'>
      <div className='card-header'>
        <h1 className='card-title fw-bold'>Rapor</h1>
      </div>
      <div className='card-body py-5'>
        <ReportListTable />
      </div>
    </div>
  )
}

export default Report
