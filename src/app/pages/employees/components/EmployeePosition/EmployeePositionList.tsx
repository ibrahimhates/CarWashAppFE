import moment from 'moment'
import { Position, StudyShape, Unit, UnitForPosition, UnitForUnitType, UnitType, UnitTypeForList } from './EmployeePosition'

import { KTSVG } from '../../../../../_metronic/helpers'
import { useEffect, useState } from 'react'
import PositionUpdateModal from './UpdateModal/PositionUpdateModal'
import Dropdown from './UpdateDeleteDropDown/DropDown'

type Props = {
    position: any
    unitType: UnitTypeForList[]
    showEditandCreateButton: boolean
    employeePosition: Position[]
    fetchEmployeePosition: () => void
    studyShapes: StudyShape[]
    unitTypes: UnitType[]
    unitEmptyIds: UnitForPosition[]
}



const EmployeePositionList = ({
    position,
    unitType,
    showEditandCreateButton,
    employeePosition,
    fetchEmployeePosition,
    studyShapes,
    unitTypes,
    unitEmptyIds
}: Props) => {
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
    const [exited, setExited] = useState(true)
    const [loading,setLoading] = useState(false)

    const showUpdateHandler = () =>{
        setExited(false)
        setShowUpdateModal(true)
        console.log(position)
    }
    useEffect(() => {
        console.log(unitEmptyIds);
    })
    return (
        <tr key={position.id}>
            <td>
                {(() => {
                    const days = moment().diff(position.positionBeginDate, 'days')
                    return days > 0 ? days : 0
                })()}
            </td>
            <td>
                <div className='text-dark fw-bold text-hover-primary fs-6'>
                    {moment(position.positionBeginDate).format('DD-MM-YYYY')}
                    {position.isActive && (
                        <span className='badge badge-light-primary' style={{ marginLeft: '10px' }}>
                            Aktif
                        </span>
                    )}
                </div>
            </td>
            <td>
                <div className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    {position.endPositionDate
                        ? moment(position.endPositionDate).format('DD-MM-YYYY')
                        : 'Devam Ediyor'}
                </div>
            </td>
            <td>
                <div className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    {position.studyShapeName}
                </div>
            </td>

            {unitType.map((currentUnitType) => {
                const matchingUnit: Unit = position.units.find(
                    (unit: Unit) => unit.queue === currentUnitType.queue
                )
                const unitName = matchingUnit ? matchingUnit.unitName : '-'

                return (
                    <td key={currentUnitType.id}>
                        <div className='text-dark fw-bold text-hover-primary mb-1 fs-6'>{unitName}</div>
                    </td>
                )
            })}
            {showEditandCreateButton && (
                <td className='text-end'>
                    <div className='dropdown dropstart'>
                    <button disabled={loading} type="button" className="btn btn-outline-light btn-active-secondary btn-icon dropdown-toggle" data-bs-toggle="dropdown">
                        {!loading && (
                            <KTSVG
                                path='/media/icons/duotune/general/gen052.svg'
                                className='svg-icon-4 text-dark'
                            />
                        )}
                        {loading && (
                            <span className='indicator-progress text-primary' style={{ display: 'block' }}>
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                        )}
                    </button>
                    <Dropdown showUpdateHandler={showUpdateHandler} positionId={position.id} fetchAllPositions={fetchEmployeePosition} setLoading={setLoading} />
                </div>
                    {!exited && <PositionUpdateModal
                        show={showUpdateModal}
                        onExited={() => setExited(true)}
                        handleClose={() => setShowUpdateModal(false)}
                        setEmployeePosition={fetchEmployeePosition}
                        positions={employeePosition}
                        selectedPosition={position}
                        studyShapes={studyShapes}
                        unitTypes={unitTypes}
                        defaultUnits={unitEmptyIds}
                    />}

                </td>
            )}
        </tr>
    )
}

export default EmployeePositionList
