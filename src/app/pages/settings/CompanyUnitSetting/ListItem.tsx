import {useEffect, useState} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {UnitType} from './CompUnitsSettings'

type Props = {
  item: UnitType
  provided: any
  snapshot: any
  index: number
  updateUnitTypeDatas: (idToUpdate: string, fieldsToUpdate: Partial<UnitType>) => void
  deleteUnitType: (idToUpdate: string) => void
  show: boolean
}

const ListItem = ({
  item,
  provided,
  snapshot,
  index,
  updateUnitTypeDatas,
  deleteUnitType,
  show,
}: Props) => {
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    updateUnitTypeDatas(item.id, {queue: index + 1})
  }, [index])

  useEffect(() => {
    setIsUpdated(show)
  }, [show])

  return (
    <div
      ref={provided.innerRef}
      snapshot={snapshot}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className='input-group mb-3 '
    >
      <div className='input-group-prepend'>
        <span className='input-group-text' id='basic-addon1'>
          {index + 1}.
        </span>
      </div>
      <input
        type='text'
        className='form-control'
        name='firstName'
        value={item.name}
        onChange={(e) => updateUnitTypeDatas(item.id, {name: e.target.value})}
        readOnly={!isUpdated}
      />
      <div className='input-group-append justify-content-between'>
        {show && (
          <button
            type='button'
            className='btn btn-icon btn-danger form-control'
            onClick={() => deleteUnitType(item.id)}
          >
            <KTSVG path='/media/svg/trash-outline.svg' className='svg-icon-4' />
          </button>
        )}
      </div>
    </div>
  )
}

export default ListItem
