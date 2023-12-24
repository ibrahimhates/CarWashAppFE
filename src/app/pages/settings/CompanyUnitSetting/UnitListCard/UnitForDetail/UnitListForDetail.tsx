import {useState} from 'react'
import UnitCreateModal from '../../UnitCreateModal/UnitCreateModal'
import OnlyUnitList from './OnlyUnitList'
import { UnitType } from '../../../SettingRoute'

type Props = {
  unitType: UnitType
  companyId: string
  role:string
}

const UnitListForDetail = ({unitType, companyId,role}: Props) => {
  const [show, setShow] = useState(false)
  const [showUnit, setShowUnit] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  return (
    <div key={unitType.id} className='card mb-2 mt-2'>
      <div
        className='card-header border-0'
        role='button'
        aria-expanded={showUnit}
        aria-controls={`unit-type-${unitType.id}`}
      >
        <a
          className='card-title fs-5 m-0 cursor-pointer text-hover-primary'
          onClick={() => setShowUnit(!showUnit)}
        >
          {unitType.name}
        </a>
        <div className='card-toolbar'>
          {role==='HesapSahibi'&&
          <button
            type='button'
            className='btn btn-sm btn-primary fs-6'
            onClick={() => setShow(true)}
          >
            Yeni Ekle
          </button>}
          <UnitCreateModal
            unitTypeId={unitType.id}
            show={show}
            handleClose={handleClose}
            companyId={companyId}
            title={unitType.name}
          />
        </div>
      </div>

      <div className={`collapse ${showUnit ? 'show' : ''}`} id={`unit-type-${unitType.id}`}>
        <div className='card-body border-top p-9'>
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3  '>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-250px'>Adı</th>
                <th className='min-w-140px'>Düzenle</th>
              </tr>
            </thead>
            <tbody>
              {unitType.units.map((unit) => (
                <OnlyUnitList role={role} unit={unit} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UnitListForDetail
