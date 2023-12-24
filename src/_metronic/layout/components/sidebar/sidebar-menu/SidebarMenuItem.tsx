import { FC } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { checkIsActive, KTSVG, WithChildren } from '../../../../helpers'
import { useLayout } from '../../../core'

type Props = {
  to?: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  onClick?: () => void
}

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to = '#',
  title,
  icon,
  fontIcon,
  hasBullet = false,
  onClick,
}) => {
  const { pathname } = useLocation()
  const { config } = useLayout()
  const { app } = config
  const handleMenuItemClick = onClick
  return (
    <div className='menu-item mt-5' data-kt-menu-trigger='click' onClick={handleMenuItemClick}>
      <Link
        className={clsx('menu-link without-sub', { active: checkIsActive(pathname, to) })}
        to={to}
      >
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
          <span className='menu-icon'>
            {' '}
            <KTSVG path={icon} className='svg-icon-1' />
          </span>
        )}
        {fontIcon && app?.sidebar?.default?.menu?.iconType === 'font' && (
          <i className={clsx('bi fs-4', fontIcon)}></i>
        )}
        <span className='menu-title fs-3'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export { SidebarMenuItem }
