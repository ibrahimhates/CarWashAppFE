/* eslint-disable react/jsx-no-target-blank */
import { useAuth } from '../../../../app/modules/auth'
import { KTSVG } from '../../../helpers'
import { SidebarMenuItem } from './sidebar-menu/SidebarMenuItem'

const SidebarFooter = () => {
  const { logout } = useAuth()
  const signOut = () => {
    logout()
  }
  return (
    <div className='app-sidebar-footer flex-column-auto pt-2 pb-6 px-6' id='kt_app_sidebar_footer'>
      <a
        onClick={signOut}
        target='_blank'
        className='btn d-inline-flex align-items-center justify-content-start btn-custom btn-primary overflow-hidden text-nowrap h-40px w-100'
        data-bs-toggle='tooltip'
        data-bs-trigger='hover'
        data-bs-dismiss-='click'
        title='Log out'
      >
        <KTSVG path='/media/icons/duotune/arrows/arr096.svg' className='svg-icon-2 fs-3 ms-3 me-10' />
        <span className='d-lg-block  fs-3'>Log Out</span>
      </a>
    </div>
  )
}

export { SidebarFooter }
