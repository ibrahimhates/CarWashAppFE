import {Modal} from 'react-bootstrap'
import moment from 'moment/moment'
import React, {useRef, useState} from 'react'
import EmployeeStep from './steps/EmployeeStep'
import {KTSVG} from '../../../../../_metronic/helpers'
import {StepperComponent} from '../../../../../_metronic/assets/ts/components'
import AttandaceStep from './steps/AttandaceStep'
import HttpService from '../../../../services/HttpService'
import {showNotification} from '../../../../actions/notificationAction'
import {useDispatch} from 'react-redux'
import {REGISTER_EMPLOYEE_URL} from '../../../../modules/auth/core/_requests'
import Cookies from 'js-cookie'

type Params = {
  handleClose: () => void
  show: boolean
  handleExit: () => void
  fetchAllEmployee:() => void
}

export enum Role {
  SuperAdmin = 1,
  Manager = 2,
  Worker = 3,
}

export enum Days {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}
export interface Attandace {
  offDays: Days[]
  breakDurationBegin: string
  breakDurationEnd: string
  clockOutDate: string
  clockInDate: string
}

export interface EmployeeCreate {
  roleId: Role
  userName: string
  email: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
  attandace: Attandace
}

const CreateModal = ({handleClose, show, handleExit,fetchAllEmployee}: Params) => {
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const [employee, setEmployee] = useState<EmployeeCreate>({
    roleId: Role.Worker,
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    attandace: {
      offDays: [],
      breakDurationBegin: '00:00:00',
      breakDurationEnd: '00:00:00',
      clockOutDate: '',
      clockInDate: ''
    },
  })

  const updateEmployeeFields = (field: Partial<EmployeeCreate>) => {
    const updated = {...employee, ...field}
    setEmployee(updated)
    if (updated.password === updated.passwordConfirm) {
      setIsValid(false)
    } else setIsValid(true)
  }

  const [attandace, setAttandace] = useState<Attandace>({
    offDays: [Days.Sunday],
    breakDurationBegin: '00:00:00',
    breakDurationEnd: '00:00:00',
    clockOutDate: '',
    clockInDate: '',
  })

  const updateAttandaceFields = (field: Partial<Attandace>) => {
    const updated = {...attandace, ...field}
    setAttandace(updated)
    updateEmployeeFields({attandace: updated})
  }

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit()
  }
  const submit = () => {
    setLoading(true)
    HttpService.post(REGISTER_EMPLOYEE_URL, employee,Cookies.get("authToken"))
      .then(() => {
        handleClose()
        dispatch(
          showNotification({
            type: 'success',
            message: `Calisan basarili bir sekilde eklendi`,
          })
        )
        fetchAllEmployee();
      })
      .catch((err) => {
        const data = err.response.data
        dispatch(
          showNotification({
            type: 'error',
            message: `${data.messages}`,
          })
        )
        setLoading(false)
      })
  }

  return (
    <Modal
      id='create_position_modal'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-500px'
      show={show}
      onHide={handleClose}
      onExit={handleExit}
      backdrop={true}
    >
      <div className='modal-header d-flex justify-content-center'>
        <h3>ÇALIŞAN EKLE</h3>
      </div>

      <div className='modal-body py-lg-10 px-lg-10 overflow-auto mh-600px'>
        <form onSubmit={(e) => onSave(e)}>
          {isValid && (
            <div className='col-md-12 alert alert-danger'>
              <span className='alert-text'>Sifreler uyusmuyor</span>
            </div>
          )}

          <div className='row g-5'>
            <div className='overflow-auto'>
              <EmployeeStep
                isValid={isValid}
                employeeCreate={employee}
                updateFields={updateEmployeeFields}
              />
              <div style={{margin: '20px', textAlign: 'center'}}>
                <h6>ÇALIŞMA ŞEKLİ</h6>
              </div>
              <AttandaceStep attandace={attandace} updateAttandaceFields={updateAttandaceFields} />
            </div>

            <button
              type='submit'
              className='btn btn-primary'
            >
              {!loading && <span className='indicator-label'>KAYDET</span>}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
              Lütfen bekleyin...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CreateModal
