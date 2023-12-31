import AppointmentListTable from './list/AppointmentListTable'

const ManagerAppointment = () => {

  return (
    <div className='card'>
      <div className='card-header'>
        <h1 className='card-title fw-bold'>Randevular</h1>
      </div>
      <div className='card-body py-5'>
        <AppointmentListTable />
      </div>
    </div>
  )
}

export default ManagerAppointment
