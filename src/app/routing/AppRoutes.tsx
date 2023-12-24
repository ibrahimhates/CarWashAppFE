/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC, useEffect, useState} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import {App} from '../App'
import {useThemeMode} from '../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {ConfigProvider, theme} from 'antd'
import { useSelector } from 'react-redux'

const {PUBLIC_URL} = process.env

const AppRoutes: FC = () => {
  const {currentUser} = useAuth()

  const mode = useSelector((state: any) => state.mode);
  

  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode-variables')
    } else {
      document.body.classList.remove('dark-mode-variables')
    }
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorText: mode !== 'dark' ? '#080808' : '#C2C2C2',
          colorBgBase: mode !== 'dark' ? '#f6f6f9' : '#202031',
          colorBgContainer: mode !== 'dark' ? '#f6f6f9' : '#202031',
        },
      }}
    >
      <BrowserRouter basename={PUBLIC_URL}>
        <Routes>
          <Route element={<App />}>
            <Route path='error/*' element={<ErrorsPage />} />
            <Route path='logout' element={<Logout />} />
            { currentUser ? (//currentUser
              <>
                <Route path='/*' element={<PrivateRoutes />} />
                <Route index element={<Navigate to='/dashboard' />} />
              </>
            ) : (
              <>
                <Route path='auth/*' element={<AuthPage />} />
                <Route path='*' element={<Navigate to='/auth' />} />
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export {AppRoutes}
