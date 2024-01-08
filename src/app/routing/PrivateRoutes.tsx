import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import { useState } from 'react'
import PackagePage from '../car-wash-pages/package/PackagePage'
import AppointmentPage from '../car-wash-pages/appointment/AppointmentPage'
import EmployeePage from '../car-wash-pages/employees/EmployeePage'
import ProfilePage from '../car-wash-pages/profile/ProfilePage'
import MyCarsPage from '../car-wash-pages/my-cars/MyCarsPage'
import ReportPage from '../car-wash-pages/report/ReportPage'

const PrivateRoutes = () => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/profiles' />} />
        <Route path="appointments" element={<AppointmentPage/>} />
        <Route path="employees" element={<EmployeePage/>} />
        <Route path="packages" element={<PackagePage/>} />
        <Route path="profiles" element={<ProfilePage/>} />
        <Route path="mycars" element={<MyCarsPage/>} />
        <Route path="reports" element={<ReportPage/>} />
        {/* Lazy Modules */}

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
