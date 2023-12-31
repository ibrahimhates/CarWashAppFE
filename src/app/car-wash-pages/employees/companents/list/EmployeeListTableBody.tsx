import moment from 'moment'
import React, {useState} from 'react'
import {Rating} from '@mui/material'
import {Test} from './EmployeeListTable'

export interface Arac{
  ad:string;
  soyad:string;
  position:string;
  tarih:string;
} 
const AppointmentListTableBody = ({status,id} :Test) => {
  const [showUpdate,setShowUpdate] = useState(false);
  const [showRating,setShowRating] = useState(false);
  const [rating,setRating] = useState<number | null>(0)

  const [arac,setArac] = useState<Arac>({
    ad:'Ibrahim Halil',
    soyad:'Ates',
    position:'Calisan',
    tarih:'10.12.2024'
  })
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleCloseRatind = () => setShowRating(false);

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
      {/*<UpdateModal handleClose={handleCloseUpdate} show={showUpdate} arac={arac} />
      <RatingModal handleClose={handleCloseRatind} show={showRating} arac={arac} rating={rating} setRating={setRating}/>*/}
    </tr>
  )
}

export default AppointmentListTableBody
