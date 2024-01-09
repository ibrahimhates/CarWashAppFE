import clsx from 'clsx'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { HeaderNotificationsMenu, HeaderUserMenu, Search, ThemeModeSwitcher } from '../../../partials'
import { useLayout } from '../../core'
import { useAuth } from '../../../../app/modules/auth'
import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { customJwtDecode } from '../../../../app/CustomJwt'
import Cookies from 'js-cookie'

const itemClass = 'ms-1 ms-lg-3'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px'
const userAvatarClass = 'symbol-35px symbol-md-40px'
const btnIconClass = 'svg-icon-1'

const Navbar = () => {
  const { config } = useLayout()
  const token: any = Cookies.get(`authToken`)
  const { currentUser } = useAuth()
  const decode: { Role: string } = customJwtDecode(token)
  const role: string = decode.Role
  return (
    <div className='app-navbar bg-white'>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          {currentUser &&
            (currentUser.profilePicture != '' ? (
              <LazyLoadImage
                alt='Logo'
                src={`data:image/png+svg+xml;base64,${currentUser.profilePicture}`}
              />
            ) : (
              <span className={`symbol-label bg-light-primary text-danger fs-5 fw-bolder`}>
                {currentUser.fullName?.charAt(0)}
              </span>
            ))}
        </div>
        <HeaderUserMenu />
      </div>

      {/* {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className={btnIconClass} />
          </div>
        </div>
      )} */}
    </div>
  )
}

export { Navbar }
