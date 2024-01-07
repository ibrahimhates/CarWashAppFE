import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import { HomePage } from '../pages/home/HomePage'
import EmployeesPage from '../pages/employees/EmployeesPage'
import EmployeesDetailPage from '../pages/employees/EmployeeDetailPage'
import EmployeeInfos from '../pages/employees/components/EmployeeInfos/EmployeeInfos'
import CompaniesPage from '../pages/companies/CompaniesPage'
import PermissionAndApprovalPage from '../pages/permissions/PermissionAndApprovalPage'
import SettingPage from '../pages/settings/SettingPage'
import EmployeeProfile from '../pages/employees/components/EmployeeProfile/EmployeeProfile'
import { useState } from 'react'
import ReportsPage from '../pages/reports/ReportsPage'

const PrivateRoutes = () => {
  const AppointmentPage = lazy(() => import('../car-wash-pages/appointment/AppointmentPage'));
  const EmployeePage = lazy(() => import('../car-wash-pages/employees/EmployeePage'));
  const PackagePage  = lazy(() => import('../car-wash-pages/package/PackagePage'));
  const MyCarsPage  = lazy(() => import('../car-wash-pages/my-cars/MyCarsPage'));
  const ProfilePage = lazy(() => import('../car-wash-pages/profile/ProfilePage'));
  const ReportPage = lazy(() => import('../car-wash-pages/report/ReportPage'));
  const ProfilePageOld = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const EmployeesDetailPage = lazy(() => import('../pages/employees/EmployeeDetailPage'))
  const PermissionPage = lazy(() => import('../pages/permissions/PermissionPage'))
  const SettingRoute = lazy(() => import('../pages/settings/SettingRoute'))

  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        <Route path="ourappointments" element={<AppointmentPage/>} />
        <Route path="ouremployees" element={<EmployeePage/>} />
        <Route path="ourpackages" element={<PackagePage/>} />
        <Route path="ourprofiles" element={<ProfilePage/>} />
        <Route path="ourmycars" element={<MyCarsPage/>} />
        <Route path="ourreports" element={<ReportPage/>} />
        <Route path='reports' element={<ReportsPage />} />
        <Route path='companies' element={<CompaniesPage />} />
        <Route path='employees' element={<EmployeesPage />} />
        <Route path='profile' element={<EmployeeProfile loading={loading} setLoading={setLoading} />} />
        <Route path='dashboard' element={<HomePage />} />
        <Route path='requests' element={<PermissionAndApprovalPage />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='settings' element={<SettingPage />} />
        {/* Lazy Modules */}

        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePageOld />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />

        <Route
          path='employees/profiledetail/:id/*'
          element={
            <SuspensedView>
              <EmployeesDetailPage />
            </SuspensedView>
          }
        />
        <Route
          path='profile/:id/*'
          element={
            <SuspensedView>
              <EmployeesDetailPage />
            </SuspensedView>
          }
        />
        <Route
          path='requests/*'
          element={
            <SuspensedView>
              <PermissionPage />
            </SuspensedView>
          }
        />
        <Route
          path='settings/*'
          element={
            <SuspensedView>
              <SettingRoute />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
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
