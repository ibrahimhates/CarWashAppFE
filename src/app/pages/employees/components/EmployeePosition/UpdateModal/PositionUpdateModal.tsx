import { Modal } from 'react-bootstrap'
import { KTSVG } from '../../../../../../_metronic/helpers'
import { Position, StudyShape, UnitForPosition, UnitType } from '../EmployeePosition'
import { useEffect, useLayoutEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { createPortal } from 'react-dom'
import HttpService from '../../../../../services/HttpService'
import { showNotification } from '../../../../../actions/notificationAction'
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'

interface UpdatedPosition {
  id: string
  isDeleted: boolean
  positionBeginDate: string
  endPositionDate: string
  studyShapeId: string
  units: UnitForPosition[]
}

type Props = {
  show: boolean
  handleClose: () => void
  selectedPosition: Position
  setEmployeePosition: () => void
  positions: Position[]
  studyShapes: StudyShape[]
  unitTypes: UnitType[]
  defaultUnits: UnitForPosition[]
  onExited: () => void
}

const PositionUpdateModal = ({
  show,
  handleClose,
  selectedPosition,
  setEmployeePosition,
  positions,
  studyShapes,
  unitTypes,
  defaultUnits,
  onExited,
}: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [unitIds, setUnitIds] = useState<UnitForPosition[]>({ ...defaultUnits })

  const [updatedPositionData, setUpdatedPositionData] = useState<UpdatedPosition>({
    positionBeginDate: selectedPosition.positionBeginDate,
    endPositionDate: selectedPosition.endPositionDate,
    studyShapeId: '',
    isDeleted: false,
    id: selectedPosition.id,
    units: { ...defaultUnits },
  })

  useEffect(() => {
    selectedPosition.units.forEach((unit) => {
      unitIds[unit.queue - 1] = { id: unit.unitsId }
      updatedPositionData.units[unit.queue - 1] = { id: unit.unitsId }
    })
    const stadyShape = studyShapes.find((shape) => shape.name === selectedPosition.studyShapeName)
    stadyShape && (updatedPositionData.studyShapeId = stadyShape.id)
    console.log(stadyShape)
  }, [selectedPosition])

  const updatePositionData = (fieldsToUpdate: Partial<UpdatedPosition>) => {
    const updatedData = { ...updatedPositionData, ...fieldsToUpdate }
    setUpdatedPositionData(updatedData)
  }

  const handlerUnitIdForUpdate = (unitId: string, index: number) => {
    const unitforUpdate = { ...unitIds }
    unitforUpdate[index] = { id: unitId }
    setUnitIds(unitforUpdate)
  }

  const getUnit = (unitId: string) => {
    const unit = selectedPosition.units.find((unit) => unit.unitsId === unitId)
    return unit ? true : false
  }

  const fetchUpdate = () => {
    update()
  }

  const { t } = useTranslation();
  const update = async () => {
    setLoading(true)
    await HttpService.put(`UserPosition/update`, updatedPositionData, Cookies.get('authToken'))
      .then(() => {
        setLoading(false)
        setEmployeePosition()
        handleClose()
        dispatch(showNotification({ type: 'success', message: 'Pozisyon Eklendi' }))
      })
      .catch((err) => {
        setLoading(false)
        const message = t(
          `POSITION.ERRORS.CREATE.${err.response.data.errorCode}`
        )

        console.log(message)

        if (err.response.data && err.response.data.errorCode === 'EP001') {
          const conflictPositionId = err.response.data.data.id
          const c = getConflictPosition(conflictPositionId)

          let messageText = message

          if (c?.beginDate) {
            messageText += ' Başlangıç: ' + moment(c.beginDate).format('DD-MM-YYYY')
          }

          if (c?.endDate) {
            messageText += ' Bitiş: ' + moment(c.endDate).format('DD-MM-YYYY')
          }

          dispatch(
            showNotification({
              type: 'error',
              message: messageText,
            })
          )
        } else {
          dispatch(
            showNotification({
              type: 'error',
              message: message,
            })
          )
        }
      })
  }
  const getConflictPosition = (id: string) => {
    const conflict = positions.find((item) => item.id === id)
    return {
      beginDate: conflict?.positionBeginDate || '',
      endDate: conflict?.endPositionDate || '',
    }
  }

  const clearInValidDataForUpdate = () => {
    const temp = Object.values(unitIds)
    const filterIds: UnitForPosition[] = temp.filter((unit) => unit.id !== '')
    updatePositionData({ units: filterIds })
  }

  useEffect(() => {
    clearInValidDataForUpdate()
  }, [unitIds])

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  return (
    <Modal
      id='create_position_modal'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-700px'
      show={show}
      onHide={handleClose}
      backdrop={true}
      onExited={onExited}
    >
      <div className='modal-header'>
        <h2>Pozisyon Güncelle</h2>
        <button type="button" className='btn-close'
          onClick={handleClose}
        />
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <form id='create_employee_form'>
          <div className='row g-5'>
            {unitTypes &&
              unitTypes.map((ut) => {
                return (
                  <div key={ut.id} className='col-md-6'>
                    <div className='mb-5'>
                      <label className='form-label'>{ut.name}</label>
                      <select
                        className='form-select'
                        name='unit'
                        onChange={(e) => handlerUnitIdForUpdate(e.target.value, ut.queue - 1)}
                      >
                        <option value='' selected={true}>
                          {selectedPosition ? `-` : `Lutfen ${ut.name} seciniz`}
                        </option>
                        {ut.units.map((unit) => (
                          <option key={unit.id} value={unit.id} selected={getUnit(unit.id)}>
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )
              })}
            {unitTypes && unitTypes.length % 2 !== 0 && <div className='col-md-6'></div>}
            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>Calisma Sekli</label>

                <select
                  className='form-control'
                  name='studyShape'
                  onChange={(e) => updatePositionData({ studyShapeId: e.target.value })}
                >
                  {!selectedPosition && <option value=''>Lutfen Calisma Sekli seciniz</option>}
                  {studyShapes &&
                    studyShapes.map((shape) => (
                      <option
                        key={shape.id}
                        value={shape.id}
                        selected={shape.name === selectedPosition.studyShapeName}
                      >
                        {shape.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-5'></div>
            </div>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>{'Başlangıç Tarihi'}</label>
                <input
                  type='date'
                  className='form-control'
                  name='begin'
                  value={moment(updatedPositionData.positionBeginDate).format('YYYY-MM-DD')}
                  onChange={(e) => updatePositionData({ positionBeginDate: e.target.value })}
                />
              </div>
            </div>

            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>Bitis Tarihi</label>
                <input
                  type='date'
                  className='form-control'
                  name='end'
                  value={moment(updatedPositionData.endPositionDate).format('YYYY-MM-DD')}
                  onChange={(e) => updatePositionData({ endPositionDate: e.target.value })}
                />
              </div>
            </div>

            <div className='d-flex justify-content-end'>
              <button type='button' className='btn btn-danger me-3' onClick={handleClose}>
                İptal Et
              </button>
              <button type='button' className='btn btn-primary' onClick={fetchUpdate}>
                {!loading && <span className='indicator-label'>Güncelle</span>}
                {loading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    Lütfen bekleyin...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default PositionUpdateModal
