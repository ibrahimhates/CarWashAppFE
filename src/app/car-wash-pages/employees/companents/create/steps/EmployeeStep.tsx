import React from 'react'
import {EmployeeCreate, Role} from '../CreateModal'
import clsx from 'clsx'

type Props = {
  updateFields: (field: Partial<EmployeeCreate>) => void
  employeeCreate: EmployeeCreate
  isValid: boolean
}

const EmployeeStep = ({updateFields, employeeCreate, isValid}: Props) => {
  return (
    <>
      <div className='col-md-12 mb-2'>
        <div className='input-group'>
          <label className='input-group-text fw-bold'>{'ADI:'}</label>
          <input
            type='text'
            className='form-control'
            name='ad'
            required
            value={employeeCreate.firstName}
            onChange={(e) => updateFields({firstName: e.target.value})}
          />
        </div>
      </div>
      <div className='col-md-12 mb-2'>
        <div className='input-group'>
          <label className='input-group-text fw-bold'>{'SOYADI:'}</label>
          <input
            type='text'
            className='form-control'
            name='soyad'
            required
            value={employeeCreate.lastName}
            onChange={(e) => updateFields({lastName: e.target.value})}
          />
        </div>
      </div>
      <div className='col-md-12 mb-2'>
        <div className='input-group'>
          <label className='input-group-text fw-bold'>{'KULLANICI ADI:'}</label>
          <input
            type='text'
            className='form-control'
            name='username'
            required
            value={employeeCreate.userName}
            onChange={(e) => updateFields({userName: e.target.value})}
          />
        </div>
      </div>
      <div className='col-md-12 mb-2'>
        <div className='input-group'>
          <label className='input-group-text fw-bold'>{'TELEFON:'}</label>
          <input
            type='tel'
            className='form-control'
            name='tel'
            required
            value={employeeCreate.phoneNumber}
            onChange={(e) => updateFields({phoneNumber: e.target.value})}
          />
        </div>
      </div>
      <div className='col-md-12 mb-2'>
        <div className='input-group'>
          <label className='input-group-text fw-bold'>{'EMAIL:'}</label>
          <input
            type='email'
            className='form-control'
            name='email'
            required
            value={employeeCreate.email}
            onChange={(e) => updateFields({email: e.target.value})}
          />
        </div>
      </div>
      <div className='col-md-12 mb-2'>
        <div className={`input-group ` + (isValid && `border border-danger border-1 rounded`)}>
          <label className='input-group-text fw-bold'>{'SIFRE:'}</label>
          <input
            type='password'
            className='form-control'
            name='sifre'
            value={employeeCreate.password}
            onChange={(e) => updateFields({password: e.target.value})}
            required
          />
        </div>
      </div>
      <div className='col-md-12 mb-2'>
        <div className={`input-group ` + (isValid && `border border-danger border-1 rounded`)}>
          <label className='input-group-text fw-bold'>{'SIFRE TEKRAR:'}</label>
          <input
            type='password'
            className='form-control'
            name='sifretkr'
            value={employeeCreate.passwordConfirm}
            onChange={(e) => updateFields({passwordConfirm: e.target.value})}
            required
          />
        </div>
      </div>
      <div className='col-md-12 mb-2'>
        <div className='input-group'>
          <label className='input-group-text fw-bold'>{'ROL:'}</label>
          <select
            className='form-select'
            name='rol'
            onChange={(e) => updateFields({roleId: parseInt(e.target.value)})}
          >
            <option key={Role.Worker} value={Role.Worker} selected>
              Calisan
            </option>
            <option key={Role.Manager} value={Role.Manager}>
              Yonetici
            </option>
          </select>
        </div>
      </div>
      <div className='col-md-12'>
        <label className='form-label fw-bolder text-dark fs-6'>Address</label>
        <textarea
          autoComplete='off'
          name='address'
          className='form-control'
          value={employeeCreate.address}
          onChange={(e) => updateFields({address: e.target.value})}
        />
      </div>
    </>
  )
}

export default EmployeeStep
