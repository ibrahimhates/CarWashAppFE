import AppointmentListTable from './list/AppointmentListTable'
import {useEffect, useState} from 'react'
import CreateModal from './create/CreateModal'
import HttpService from '../../../services/HttpService'
import {showNotification} from '../../../actions/notificationAction'
import {useDispatch} from 'react-redux'
import {useAuth} from '../../../modules/auth'
import Cookies from 'js-cookie'

export interface WashPackageList {
  id: number
  packageName: string
  duration: number
  price: number
}

export interface VehicleList {
  id: number
  plateNumber: string
  brandName: string
}

interface BrandForApp{
  id:number
  name:string
}

interface VehicleListForApp {
  id:number
  lastWashDate:string
  brand:BrandForApp
  customerId:number
  model:number
  plateNumber:string
}

export interface AppointmentList {
  id:number
  vehicle:VehicleListForApp
  packageName:string
  appointmentDate:string
  rating:number | null
  carWashStatus:CarWashStatus
}

export enum CarWashStatus{
  Waiting,
  InProcess,
  Complete
}


const CustomerAppointment = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [washPackageList, setWashPackageList] = useState<WashPackageList[]>([])
  const [vehicleList, setVehicleList] = useState<VehicleList[]>([])
  const auth = useAuth()

  const [appointmentList, setAppointmentList] = useState<AppointmentList[]>([])

  useEffect(() => {
    HttpService.get(`Washes/allForCustomer`)
      .then((response) => {
        setWashPackageList(response.data.data)
      })
      .catch((err) => {
        const data = err.response.data
        dispatch(
          showNotification({
            type: 'error',
            message: `${data.messages}`,
          }),
        )
      })
  }, [])

  useEffect(() => {
    HttpService.get(`Vehicle/allForAppoint/${auth.currentUser?.id}`)
      .then((response) => {
        setVehicleList(response.data.data)
      })
      .catch((err) => {
        const data = err.response.data
        dispatch(
          showNotification({
            type: 'error',
            message: `${data.messages}`,
          }),
        )
      })
  }, [])

  const fetchAllAppointment = () => {
    HttpService.get(`Appointmets/getByCustId?custId=${auth.currentUser?.id}`,Cookies.get("authToken"))
      .then((response) => {
        setAppointmentList(response.data.data)
      })
      .catch((err) => {
        const data = err.response.data
        dispatch(
          showNotification({
            type: 'error',
            message: `${data.messages}`,
          }),
        )
      })
  }

  useEffect(() => fetchAllAppointment(), [])

  const handleClose = () => setShow(false)

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title fw-bold">Randevular</h1>
        <div className="btn btn-primary align-self-center" onClick={() => setShow(true)}>
          Randevu Olustur
        </div>
      </div>
      <div className="card-body py-5">
        <AppointmentListTable appointmentList={appointmentList} fetchAllAppointment={fetchAllAppointment}/>
      </div>
      <CreateModal handleClose={handleClose} show={show} fetchAllAppointment={fetchAllAppointment}
                   vehicleList={vehicleList} washPackageList={washPackageList} />
    </div>
  )
}

export default CustomerAppointment
