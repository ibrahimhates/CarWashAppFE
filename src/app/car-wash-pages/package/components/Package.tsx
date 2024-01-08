import {useState} from 'react'
import PackageListTable from './list/PackageListTable'
import CreateModal from './create/CreateModal'
import HttpService from '../../../services/HttpService'
import {showNotification} from '../../../actions/notificationAction'
import Cookies from 'js-cookie'
import {useDispatch} from 'react-redux'

export interface WashPackage {
  id: number
  packageName: string
  description: string
  price: number
  duration: number
}

const Package = () => {
  const [washPackage, setPackage] = useState<WashPackage[]>([])
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const fetchAllWashPackage = () => {
    HttpService.get(`Washes/getAll`,Cookies.get("authToken"))
      .then((response) => {
        setPackage(response.data.data)
      })
      .catch((err) => {
        dispatch(
          showNotification({
            type: 'error',
            message: `Paketler listelenirken hata olustu`,
          })
        )
      })
  }
  const handleClose = () => setShow(false)
  return (
    <div className='card'>
      <div className='card-header'>
        <h1 className='card-title fw-bold'>Paketler</h1>
        <div className='btn btn-primary align-self-center' onClick={() => setShow(true)}>
          Paket Ekle
        </div>
      </div>
      <div className='card-body py-5'>
        <PackageListTable washPackage={washPackage} fetchAllWashPackage={fetchAllWashPackage}/>
      </div>
      <CreateModal handleClose={handleClose} show={show} fetchAllWashPackage={fetchAllWashPackage}/>
    </div>
  )
}

export default Package
