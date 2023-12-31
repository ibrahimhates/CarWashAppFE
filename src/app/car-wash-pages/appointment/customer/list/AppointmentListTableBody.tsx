import moment from 'moment'
import {Test} from './AppointmentListTable'
import CreateModal from '../create/CreateModal'
import React, {useState} from 'react'
import UpdateModal from '../update/UpdateModal'
import RatingModal from '../rating/RatingModal'
import {Rating} from '@mui/material'

export interface Arac{
  plaka:string;
  marka:string;
  model:string;
  paket:string;
  tarih:string;
} 
const AppointmentListTableBody = ({status,id} :Test) => {
  const [showUpdate,setShowUpdate] = useState(false);
  const [showRating,setShowRating] = useState(false);
  const [rating,setRating] = useState<number | null>(0)

  const [arac,setArac] = useState<Arac>({
    plaka:'34 RC 233',
    marka:'BMW',
    model:'M50',
    paket:'IC DIS',
    tarih:'10.12.2024'
  })
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleCloseRatind = () => setShowRating(false);

  return (
    <tr key={id}>
      <td>{arac.plaka}</td>
      <td>{arac.marka}</td>
      <td>{arac.model}</td>
      <td>{arac.paket}</td>
      <td>{moment(arac.tarih).format('YYYY-MM-DD')}</td>
      <td>
        {status && rating !== 0 ? (
          <Rating
            size='large'
            name='simple-controlled'
            value={rating}
            readOnly
          />
        ) : (
          <span>{'-'}</span>
        )}
      </td>
      <td>
        <div className='d-flex justify-content-center'>
          {!status && (
            <>
              <button className='btn btn-secondary me-2' onClick={() => setShowUpdate(true)}>
                Duzenle
              </button>
              <button className='btn btn-danger' onClick={() => {}}>
                Iptal
              </button>
            </>
          )}
          {status && (
            <button
              disabled={false}
              className='btn btn-warning'
              onClick={() => setShowRating(true)}
            >
              Puan Ver
            </button>
          )}
        </div>
      </td>
      <UpdateModal handleClose={handleCloseUpdate} show={showUpdate} arac={arac} />
      <RatingModal handleClose={handleCloseRatind} show={showRating} arac={arac} rating={rating} setRating={setRating}/>
    </tr>
  )
}

export default AppointmentListTableBody
