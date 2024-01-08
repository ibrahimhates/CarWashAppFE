import {Attandace, Days, Role} from '../CreateModal'
import React from 'react'
import moment from 'moment'

type Props = {
  attandace: Attandace
  updateAttandaceFields: (field: Partial<Attandace>) => void
}
const AttandaceStep = ({attandace, updateAttandaceFields}: Props) => {
  return (
    <>
      <div className='col-md-12 mb-2'>
        <div className='input-group'>
          <label className='input-group-text fw-bold'>{'MESAI BASLAMA:'}</label>
          <input
            type='time'
            className='form-control'
            name='baslama'
            required
            value={attandace.clockInDate}
            onChange={(e) => updateAttandaceFields({clockInDate: e.target.value})}
          />
        </div>
      </div>
      <div className='col-md-12 mb-2'>
        <div className='input-group'>
          <label className='input-group-text fw-bold'>{'MESAI BITIS:'}</label>
          <input
            type='time'
            className='form-control'
            name='bitis'
            required
            value={attandace.clockOutDate}
            onChange={(e) => updateAttandaceFields({clockOutDate: e.target.value})}
          />
        </div>
      </div>
      <div className='col-md-12 mb-2'>
        <div className='input-group'>
          <label className='input-group-text fw-bold'>{'MOLA BASLANGIC:'}</label>
          <input
            type='time'
            className='form-control'
            name='bitis'
            required
            value={attandace.breakDurationBegin}
            onChange={(e) => updateAttandaceFields({breakDurationBegin: e.target.value})}
          />
        </div>
      </div>
      <div className='col-md-12 mb-2'>
        <div className='input-group'>
          <label className='input-group-text fw-bold'>{'MOLA BITIS:'}</label>
          <input
            type='time'
            className='form-control'
            name='bitis'
            required
            value={attandace.breakDurationEnd}
            onChange={(e) => updateAttandaceFields({breakDurationEnd: e.target.value})}
          />
        </div>
      </div>
      <div className='col-md-12 mb-2'>
        <div className='input-group'>
          <label className='input-group-text fw-bold'>{'IZIN GUNLERI:'}</label>
          <select
            className='form-control'
            name='offDays'
            multiple
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
                parseInt(option.value)
              )
              updateAttandaceFields({offDays: selectedOptions})
            }}
          >
            {Array.from({length: 7}, (_, index) => (
              <option key={index} value={index}>
                {Object.values(Days)[index]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default AttandaceStep
