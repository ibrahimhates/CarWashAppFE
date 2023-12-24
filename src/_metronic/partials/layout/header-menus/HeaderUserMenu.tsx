/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import {toAbsoluteUrl} from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            {currentUser &&
              (currentUser.profilePicture != '' ? (
                <img
                  alt='Logo'
                  src={`data:image/png+svg+xml;base64,${currentUser.profilePicture}`}
                />
              ) : (
                <span className={`symbol-label bg-light-primary text-danger fs-5 fw-bolder`}>
                  {currentUser.fullName?.charAt(0)}
                </span>
              ))}
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.fullName}
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Aktif</span>
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={`/profile/${currentUser?.id}/detail`} className='menu-link px-5'>
          My Profile
        </Link>
      </div>

      <div className='separator my-2'></div>

      <Languages />

      <div className='menu-item px-5 my-1'>
        <Link to='/settings/profilSetting' className='menu-link px-5'>
          Account Settings
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
