import moment from 'moment/moment'
import React, {useState} from 'react'
import UpdateModal, {Test} from '../update/UpdateModal'

type Params = {
  id: string
}

interface Arac {
  plaka: string
  marka: string
  model: string
  lastWashDate: string
}

const MyCarListTableBody = ({id}: Params) => {
  const [show,setShow] = useState(false)
  const [arac, setArac] = useState<Arac>({
    plaka: '23 DK 07',
    marka: 'Hyundai',
    model: 'Accent Blue',
    lastWashDate: '10.12.2024',
  })

  const testArac:Test = {
    plaka:arac.plaka,
    marka:arac.marka,
    model:arac.model
  }

  const handleClose = () => setShow(false);

  return (
    <tr key={id}>
      <td>{arac.plaka}</td>
      <td>{arac.marka}</td>
      <td>{arac.model}</td>
      <td>{moment(arac.lastWashDate).format('YYYY-MM-DD')}</td>
      <td>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-secondary me-2' onClick={() => setShow(true)}>
            Duzenle
          </button>
          <button className='btn btn-danger' onClick={() => {}}>
            Sil
          </button>
        </div>
      </td>
      <UpdateModal show={show} handleClose={handleClose} arac={testArac}/>
    </tr>
  )
}

export default MyCarListTableBody
