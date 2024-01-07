import moment from 'moment'
import React, {useState} from 'react'
import {Test} from './EmployeeListTable'
import CreateModal from '../create/CreateModal'

export interface Arac{
  ad:string;
  soyad:string;
  position:string;
  tarih:string;
} 
const AppointmentListTableBody = ({status,id} :Test) => {
  const [showUpdate,setShowUpdate] = useState(false);

  const [arac,setArac] = useState<Arac>({
    ad:'Ibrahim Halil',
    soyad:'Ates',
    position:'Calisan',
    tarih:'10.12.2024'
  })
  const handleCloseUpdate = () => setShowUpdate(false);

  return (
    <tr key={id}>
      <td className='fw-bold'>{arac.ad}</td>
      <td className='fw-bold'>{arac.soyad}</td>
      <td>{arac.position}</td>
      <td>{moment(arac.tarih).format('YYYY-MM-DD')}</td>
      <td>
        <div className='d-flex justify-content-center'>
            <>
              <button className='btn btn-secondary me-2' onClick={() => setShowUpdate(true)}>
                Duzenle
              </button>
            </>
        </div>
      </td>
      <CreateModal handleClose={handleCloseUpdate} show={showUpdate} />
    </tr>
  )
}

export default AppointmentListTableBody
