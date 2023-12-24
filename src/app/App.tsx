import {Suspense, useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {Provider, useSelector} from 'react-redux'
import store from './store'
import {notification} from 'antd'
import '../_metronic/i18n/i18n'
import {useDispatch} from 'react-redux'
import {showNotification} from './actions/notificationAction'

const App = () => {
  const [api, notificationHolder] = notification.useNotification() as any

  const notificationState = useSelector((state: any) => state.notification)

  useEffect(() => {
    if (notificationState.message !== '') {
      const message = {
        message: notificationState.message,
        description: notificationState.description,
        placement: 'bottomRight',
      }
      if (notificationState.type === 'success') {
        api.success(message)
      } else if (notificationState.type === 'warning') {
        api.warning(message)
      } else if (notificationState.type === 'info') {
        api.info(message)
      } else {
        api.error(message)
      }
    }
  }, [notificationState])

  return (
    <>
      {notificationHolder}
      <Suspense fallback={<LayoutSplashScreen />}>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </Suspense>
    </>
  )
}

export {App}
