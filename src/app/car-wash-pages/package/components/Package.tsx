import {useState} from 'react'
import PackageListTable from './list/PackageListTable'
import CreateModal from './create/CreateModal'

const Package = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  return(
    <div className='card'>
      <div className='card-header'>
        <h1 className='card-title fw-bold'>Paketler</h1>
        <div className='btn btn-primary align-self-center' onClick={() => setShow(true)}>
          Paket Ekle
        </div>
      </div>
      <div className='card-body py-5'>
        <PackageListTable/>
      </div>
      <CreateModal handleClose={handleClose} show={show}/>
    </div>
  )
}

export default Package;