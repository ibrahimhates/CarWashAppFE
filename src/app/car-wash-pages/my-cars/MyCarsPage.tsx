import MyCarListTable from './companent/list/MyCarListTable'
import {useEffect, useState} from 'react'
import CreateModal from './companent/create/CreateModal'
import HttpService from '../../services/HttpService'
import {showNotification} from '../../actions/notificationAction'
import Cookies from 'js-cookie'
import {customJwtDecode} from '../../CustomJwt'
import {useDispatch} from 'react-redux'

export interface Brand {
  id: number
  name: string
}

export interface Decode {
  userid: number
}

export interface Vehicle {
  id: number
  lastWashDate: string
  brand: Brand
  brandId: number
  customerId: number
  model: number
  plateNumber: string
}

const MyCarsPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [show, setShow] = useState(false)
  const [isExit, setExit] = useState(false)

  const token: any = Cookies.get('authToken')
  const user: Decode = customJwtDecode(token)
  const dispatch = useDispatch()

  const handleClose = () => {
    setShow(false)
  }

  useEffect(() => {
    HttpService.get(`Vehicle/all/brands`)
      .then((response) => {
        setBrands(response.data.data)
      })
      .catch((err) => {
        const data = err.response.data
        dispatch(
          showNotification({
            type: 'error',
            message: `${data.messages}`,
          })
        )
      })
  }, [])

  const fetchAllVehicle = () => {
    HttpService.get(`Vehicle/all/${user.userid}`)
      .then((response) => {
        setVehicles(response.data.data)
      })
      .catch((err) => {
        const data = err.response.data
        dispatch(
          showNotification({
            type: 'error',
            message: `${data.messages}`,
          })
        )
      })
  }

  return (
    <div className='card'>
      <div className='card-header'>
        <h1 className='card-title fw-bold'>Araclar</h1>
        <div
          className='btn btn-primary align-self-center'
          onClick={() => {
            setExit(false)
            setShow(true)
          }}
        >
          Arac Ekle
        </div>
      </div>
      <div className='card-body py-5'>
        <MyCarListTable brands={brands} vehicles={vehicles} fetchAllVehicle={fetchAllVehicle} />
      </div>
      {!isExit && (
        <CreateModal
          handleClose={handleClose}
          show={show}
          handleExit={() => setExit(true)}
          brands={brands}
          fetchAllVehicle={fetchAllVehicle}
        />
      )}
    </div>
  )
}

export default MyCarsPage
