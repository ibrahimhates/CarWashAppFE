import MyCarListTable from './companent/list/MyCarListTable'
import {useState} from 'react'
import CreateModal from './companent/create/CreateModal'

const MyCarsPage = () => {
  const [show,setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <div className='card'>
      <div className='card-header'>
        <h1 className='card-title fw-bold'>Araclar</h1>
        <div className='btn btn-primary align-self-center' onClick={() => setShow(true)}>
          Arac Ekle
        </div>
      </div>
      <div className='card-body py-5'>
        <MyCarListTable />
      </div>
      <CreateModal handleClose={handleClose} show={show} />
    </div>
)
}

export default MyCarsPage;