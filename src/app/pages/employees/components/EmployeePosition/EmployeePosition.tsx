import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HttpService from '../../../../services/HttpService'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import PositionCreateModal from './CreatedModal/PositionCreateModal'

import EmployeePositionList from './EmployeePositionList'
import { customJwtDecode } from '../../../../CustomJwt'

export interface Unit {
  queue: number
  unitsId: string
  unitTypeName: string
  unitName: string
}

export interface UnitTypeForList {
  id: string
  name: string
  queue: number
}

export interface Position {
  id: string
  userBusinessInfoId: string
  isActive: boolean
  isDeleted: boolean
  positionBeginDate: string // Bu tarihleri daha iyi bir tarih tipi ile değiştirmek daha iyidir
  endPositionDate: string // Bu tarihleri daha iyi bir tarih tipi ile değiştirmek daha iyidir
  studyShapeName: string
  units: Unit[]
}

export interface StudyShape {
  id: string
  name: string
}

export interface UnitForUnitType {
  id: string
  name: string
}

export interface UnitType {
  id: string
  queue: number
  name: string
  units: UnitForUnitType[]
}

export interface UnitForPosition {
  id: string
}

interface DecodedToken {
  CompanyId?: string
  Role?: string
}

const EmployeePosition = () => {
  const { id } = useParams() // Dışardan gelen id değerini al

  const [unitTypeAndUnits, setUnitTypeAndUnitss] = useState<UnitType[]>([])
  const [unitType, setUnitType] = useState<UnitTypeForList[]>([])
  const [studyShapes, setStudyShape] = useState<StudyShape[]>([])
  const [employeePosition, setEmployeePosition] = useState<Position[]>([])
  const [unitEmptyIds, setUnitEmptyIds] = useState<UnitForPosition[]>([])

  const token: any = Cookies.get('authToken')
  const decodedToken: DecodedToken = customJwtDecode(token)
  const companyId = decodedToken.CompanyId
  const role = decodedToken.Role
  const showEditandCreateButton = role !== 'Calisan'
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

  const fetchEmployeePosition = () => {
    HttpService.get(`UserPosition/getpositions?id=${id}`)
      .then((response) => {
        console.log(`veriii`, response.data)
        setEmployeePosition(response.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  useEffect(() => {
    fetchEmployeePosition()
  }, [])

  useEffect(() => {
    const fetchUnitTypes = async () => {
      try {
        const response = await HttpService.get(`Units/unittype?companyId=${companyId}`)
        setUnitType(response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchUnitTypes()
  }, [])

  useEffect(() => {
    async function Fetch() {
      const token: any = Cookies.get('authToken')
      const decodedToken: DecodedToken = jwtDecode(token)
      const companyId = decodedToken.CompanyId
      const response = await HttpService.get(
        `Units/unitTypesWithUnits?companyId=${companyId}`,
        token
      )
      const studyShape = await HttpService.get(`StudyShape/all/${companyId}`, token)
      setUnitTypeAndUnitss(response.data)
      setStudyShape(studyShape.data)
    }
    Fetch()
  }, [])

  useEffect(() => {
    const unitT: UnitForPosition[] = []
    unitTypeAndUnits.forEach(() => {
      unitT.push({
        id: '',
      })
    })
    setUnitEmptyIds(unitT)
  }, [unitTypeAndUnits])

  return (
    <div className={`card h-md-100`}>
      <div className='card-header cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Pozisyon</h3>
        </div>
        {showEditandCreateButton && (
          <>
            <div
              className='btn btn-primary align-self-center'
              onClick={() => setShowCreateModal(true)}
            >
              Yeni Pozisyon
            </div>
            <PositionCreateModal
              userId={id}
              show={showCreateModal}
              handleClose={() => setShowCreateModal(false)}
              setEmployeePosition={fetchEmployeePosition}
              positions={employeePosition}
              studyShapes={studyShapes}
              unitTypes={unitTypeAndUnits}
              unitEmptyIds={unitEmptyIds}
            />
          </>
        )}
      </div>

      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-15px'>Gün</th>
                <th className='min-w-150px'>Başlangıç</th>
                <th className='min-w-120px'>Bitiş</th>
                <th className='min-w-120px'>Çalışma Şekli</th>

                {unitType.map((currentUnitType) => {
                  return (
                    <th key={currentUnitType.id} className='min-w-120px'>
                      {currentUnitType.name}
                    </th>
                  )
                })}
                <th className='min-w-100px text-end'>Düzenle</th>
              </tr>
            </thead>
            {/* begin::Table body */}
            <tbody>
              {employeePosition &&
                employeePosition.map((position: any) => (
                  <EmployeePositionList
                    position={position}
                    unitType={unitType}
                    employeePosition={employeePosition}
                    fetchEmployeePosition={fetchEmployeePosition}
                    showEditandCreateButton={showEditandCreateButton}
                    studyShapes={studyShapes}
                    unitTypes={unitTypeAndUnits}
                    unitEmptyIds={unitEmptyIds}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default EmployeePosition
