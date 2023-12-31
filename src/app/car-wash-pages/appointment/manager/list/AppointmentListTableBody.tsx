import moment from 'moment'
import {Test} from './AppointmentListTable'
import React, {useState} from 'react'
import '../../Appointment.css'

export interface Arac {
  plaka: string
  marka: string
  model: string
  paket: string
  tarih: string
}

const AppointmentListTableBody = ({status, id}: Test) => {
  const [checked,setChecked] = useState(false);
  const [state,setState] = useState(false);

  const setClick =(state :boolean) =>{
    setState(state);
    setChecked(true);
  }

  const [arac, setArac] = useState<Arac>({
    plaka: '34 RC 233',
    marka: 'BMW',
    model: 'M50',
    paket: 'IC DIS',
    tarih: '10.12.2024',
  })

  return (
    <tr key={id}>
      <td>{arac.plaka}</td>
      <td>{arac.marka}</td>
      <td>{arac.model}</td>
      <td>{arac.paket}</td>
      <td>{moment(arac.tarih).format('YYYY-MM-DD')}</td>
      <td>
        <div className='d-flex justify-content-center'>
          {!checked? (
            <>
              <button
                className='btn btn-success me-2'
                onClick={() => setClick(true)}
              >
                Onayla
              </button>
              <button className='btn btn-danger' onClick={() => setClick(false)}>
                Reddet
              </button>
            </>
          ):(
            <span
              className={
                'sizeList badge badge-light-' +
                (state
                  ? 'success'
                  : 'danger')
              }>
              {state?`Onaylandi`:`Reddedildi`}
              </span>
          )
          }
        </div>
      </td>
    </tr>
  )
}

export default AppointmentListTableBody
