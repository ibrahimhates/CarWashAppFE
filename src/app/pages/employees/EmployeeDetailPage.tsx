import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, Outlet, Navigate, useLocation } from 'react-router-dom'
import { FC } from 'react'
import EmployeeProfile from './components/EmployeeProfile/EmployeeProfile'
import { default as EmployeeInfos } from './components/EmployeeInfos/EmployeeInfos'
import EmployeeOtherInfos from './components/EmployeeOtherInfos/EmployeeOtherInfos'
import EmployeePosition from './components/EmployeePosition/EmployeePosition'
import { EmployeePaymentInfos } from './components/EmployeePaymentInfos/EmployeePaymentInfos'
import { EmployeePayments } from './components/EmployeePayments/EmployeePayments'
import { EmployeePermissionInfos } from './components/EmployeePermissionInfos/EmployeePermissionInfos'
import { useParams } from 'react-router-dom'
import { EmployeeDetailHeader } from './components/EmployeeDetailHeader/EmployeeDetailHeader'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import EmployeeInventory from './components/EmployeeInventory/EmployeeInventory'
import { customJwtDecode } from '../../CustomJwt'
import EmployeeSalary from './components/EmployeeSalary/ListSalary/EmployeeSalary'
import { ProfileDetailHeader } from './components/EmployeeDetailHeader/ProfileDetailHeader'

export interface headerDetail {
  fullName: string
  businessPhoneNumber: string
  email: string
  isActive: boolean
  title: string
  profilePicture: string
  address: string
}
interface DecodedToken {
  Role: string
}

const EmployeesDetailPage: FC = () => {
  const { id } = useParams()
  const [headerDetail, setHeaderDetail] = useState<headerDetail>({
    fullName: '',
    businessPhoneNumber: '',
    email: '',
    isActive: false,
    title: '',
    profilePicture: '',
    address: '',
  })
  const { pathname } = useLocation();
  const [loading, setLoading] = useState<boolean>(false)
  const [role, setRole] = useState('')

  useEffect(() => {
    console.log(pathname)
    const token: any = Cookies.get('authToken')
    const decodedToken: DecodedToken = customJwtDecode(token)
    setRole(decodedToken.Role)
  }, [])
  return (
    <>
      {pathname.split("/")[1] === "profile" ?
        <ProfileDetailHeader
          headerDetail={headerDetail}
          setHeaderDetail={setHeaderDetail}
          loading={loading}
          setLoading={setLoading}
        /> :
        <EmployeeDetailHeader
          headerDetail={headerDetail}
          setHeaderDetail={setHeaderDetail}
          loading={loading}
          setLoading={setLoading} />}
      <Routes>
        <Route element={<Outlet />}>
          <Route path='detail' element={<EmployeeProfile loading={loading} setLoading={setLoading} />} />
          <Route
            path='infos'
            element={
              role && (
                <EmployeeInfos
                  setHeaderDetail={setHeaderDetail}
                  headerDetail={headerDetail}
                  role={role}
                />
              )
            }
          />
          <Route path='other/infos' element={<EmployeeOtherInfos role={role} />} />
          <Route path='position' element={<EmployeePosition />} />
          <Route path='salary' element={<EmployeeSalary />} />
          <Route path='permission/infos' element={<EmployeePermissionInfos />} />
          <Route path='payment/infos' element={<EmployeePaymentInfos />} />
          <Route path='payments' element={<EmployeePayments />} />
          <Route path='inventory' element={<EmployeeInventory />} />
        </Route>
      </Routes>
    </>
  )
}

export default EmployeesDetailPage
