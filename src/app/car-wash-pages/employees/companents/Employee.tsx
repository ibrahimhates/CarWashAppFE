import {useState} from 'react'
import EmployeeListTable from './list/EmployeeListTable'
import CreateModal from './create/CreateModal'

const CustomerAppointment = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

  return (
    <div className='card'>
      <div className='card-header'>
        <h1 className='card-title fw-bold'>Randevular</h1>
        <div className='btn btn-primary align-self-center' onClick={() => setShow(true)}>
          Calisan Ekle
        </div>
      </div>
      <div className='card-body py-5'>
        <EmployeeListTable />
      </div>
      <CreateModal handleClose={handleClose} show={show} />
    </div>
  )
}

export default CustomerAppointment
