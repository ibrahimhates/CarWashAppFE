import { Outlet, Route, Routes } from 'react-router-dom'
import CompUnitsSettings from './CompanyUnitSetting/CompUnitsSettings'
import SettingPage from './SettingPage'
import UnitsListCard from './CompanyUnitSetting/UnitListCard/UnitsListCard'
import CompanyUnitBase from './CompanyUnitSetting/CompanyUnitBase'
import StudyShapeSetting from './StudyShapeSetting/StudyShapeSetting'
import { useEffect, useState } from 'react'
import ApprovalProcessRoute from './ApprovalProcess/ApprovalProcessRoute'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import ProfilSettingPage from './ProfilSetting/ProfilSettingPage'
import { customJwtDecode } from '../../CustomJwt'

export interface IApprovalProcess {
  name: string
  id: string
  userQueues: IUserQueue[]
}

export interface IUserQueue {
  userId: string
  fullName: string
  queue: number
}

export interface Unit {
  id: string
  name: string
}

export interface UnitType {
  id: string
  name: string
  queue: number
  units: Unit[]
}

interface DecodedToken {
  CompanyId: string
  Role: string
}

const SettingRoute = () => {
  const [approvalProcesses, setApprovalProcesses] = useState<IApprovalProcess[]>([])

  const [unitTypes, setUnitTypes] = useState<UnitType[]>([])
  const [companyId, setCompanyId] = useState('')
  const [role, setRole] = useState('')
  useEffect(() => {
    const token: any = Cookies.get('authToken')
    const decodedToken: DecodedToken = customJwtDecode(token)
    setCompanyId(decodedToken.CompanyId);
    setRole(decodedToken.Role);
  }, [])

  return (
    <>
      <SettingPage />
      <Routes>
        <Route element={<Outlet />}>
          <Route
            path='compunitset'
            element={
              companyId !== '' && (
                <CompanyUnitBase
                  role={role}
                  companyId={companyId}
                  unitTypes={unitTypes}
                  setUnitTypes={setUnitTypes}
                />
              )
            }
          />
          <Route path='studyshapeset' element={<StudyShapeSetting />} />
          <Route
            path='approvalprocess'
            element={
              <ApprovalProcessRoute
                approvalProcesses={approvalProcesses}
                setApprovalProcesses={setApprovalProcesses}
              />
            }
          />
          <Route
            path='profilSetting'
            element={
              <ProfilSettingPage />
            }
          />
        </Route>
      </Routes>
    </>
  )
}
export default SettingRoute
