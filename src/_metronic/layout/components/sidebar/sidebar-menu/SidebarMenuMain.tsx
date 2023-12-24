/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../../helpers'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'
import { FaApple } from 'react-icons/fa'
import { useLayout } from '../../../core'
import { NavLink } from 'react-router-dom'
import { CreateNewRequestPermissionModal } from '../../../../../app/pages/requests/components/CreateNewRequestPermission/CreateNewRequestPermissionModal'
import { CreateNewAdvancePaymentModal } from '../../../../../app/pages/requests/components/CreateNewAdvancePayment/CreateNewAdvancePaymentModal'
import { CreateCompanyModal } from '../../../../../app/pages/companies/components/CompanyCreateModal/CreateCompanyModal'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { type } from 'os'
import { string } from 'yup'
import { useAuth } from '../../../../../app/modules/auth'
import { customJwtDecode } from '../../../../../app/CustomJwt'
import { useTranslation } from 'react-i18next'

type tokenModel = {
  Role: string
}

const SidebarMenuMain = () => {
  const token: any = Cookies.get(`authToken`)
  const decode: tokenModel = customJwtDecode(token)
  const role: string = decode.Role
  const auth = useAuth()
  const { t } = useTranslation();

  const [isModalRequestOpen, setIsModalRequestOpen] = useState(false)
  const [isModalAdvanceOpen, setIsModalAdvanceOpen] = useState(false)
  const [isModalCompanyOpen, setModalCompanyOpen] = useState(false)

  const handleOpenModalR = () => {
    // request permission add popup open function
    setIsModalRequestOpen(true)
  }
  const handleCloseModalR = () => {
    // request permission add popup close function
    setIsModalRequestOpen(false)
  }
  const handleOpenModalA = () => {
    // advance payment add popup open function
    setIsModalAdvanceOpen(true)
  }
  const handleCloseModalA = () => {
    // advance payment add popup close function
    setIsModalAdvanceOpen(false)
  }

  const handleOpenCompanyModal = () => {
    setModalCompanyOpen(true)
  }

  const handleCloseCompanyModal = () => {
    setModalCompanyOpen(false)
  }

  return (
    <>
      {/*
      ***********************************************************************************************
      Bizim Uygulama
      */
        }
      {/*Randevular*/}
      <SidebarMenuItem
        to={`/ourappointments/`}
        icon='/icons/sidebar/gen014.svg'
        title={'Randevular'}
        fontIcon='bi-app-indicator'
      />

      {/*Calisanlar*/}
      <SidebarMenuItem
        to={`/ouremployees`}
        icon='/icons/sidebar/com014.svg'
        title={'Çalışanlar'}
        fontIcon='bi-app-indicator'
      />

      {/*Paketler*/}
      <SidebarMenuItem
        to={`/ourpackages`}
        icon='/icons/sidebar/ecm007.svg'
        title={'Paketler'}
        fontIcon='bi-app-indicator'
      />

      {/*Araclarim*/}
      <SidebarMenuItem
        to={`/ourmycars`}
        icon='/icons/sidebar/ecm006.svg'
        title={'Araclarim'}
        fontIcon='bi-app-indicator'
      />

      {/*Raporlar*/}
      <SidebarMenuItem
        to={`/ourreports`}
        icon='/icons/sidebar/gen005.svg'
        title={'Raporlar'}
        fontIcon='bi-app-indicator'
      />

      {/*Profile*/}
      <SidebarMenuItem
        to={`/ourprofiles`}
        icon='/icons/sidebar/com013.svg'
        title={'Profil'}
        fontIcon='bi-app-indicator'
      />

      ***************************************
      {/*
      ***********************************************************************************************
      */}




      <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/general/gen001.svg'
        title={t("MENU.HOME")}
        fontIcon='bi-app-indicator'
      />

      <SidebarMenuItem
        to={`/profile/${auth.currentUser?.id}/detail`}
        icon='/media/icons/duotune/communication/com013.svg'
        title={'Profil'}
        fontIcon='bi-app-indicator'
      />

      {role === 'HesapSahibi' && (
        <SidebarMenuItem
          to='/employees'
          icon='/media/icons/duotune/communication/com014.svg'
          title={t('MENU.EMPLOYEES')}
          fontIcon='bi-app-indicator'
        />
      )}

      <SidebarMenuItemWithSub
        to=''
        title={t('MENU.REQUEST.MAINTITLE')}
        fontIcon='bi-app-indicator'
        icon='/media/icons/duotune/general/gen041.svg'
      >
        {/* list of items to be displayed in the sub-menu */}
        <SidebarMenuItem
          title={t('MENU.REQUEST.PERMISSION')}
          fontIcon='bi-app-indicator'
          onClick={handleOpenModalR}
        />

        <CreateNewRequestPermissionModal
          show={isModalRequestOpen}
          handleClose={handleCloseModalR}
        />

        <SidebarMenuItem
          title={t('MENU.REQUEST.ADVANCEPAYMENT')}
          fontIcon='bi-app-indicator'
          onClick={handleOpenModalA}
        />
        <CreateNewAdvancePaymentModal show={isModalAdvanceOpen} handleClose={handleCloseModalA} />
        {/* Add more sub-menu items as needed */}
      </SidebarMenuItemWithSub>

      <SidebarMenuItem
        to='/requests/permission'
        icon='/media/icons/duotune/flaticon/plane-_1_.svg'
        title={t('MENU.PERMISSIONS')}
        fontIcon='bi-app-indicator'
      />

      <SidebarMenuItem
        to='/reports'
        icon='/media/icons/duotune/general/gen005.svg'
        title={t('MENU.REPORTS')}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to={`/settings/` + (role === 'Calisan' ? `profilSetting` : `compunitset`)}
        icon='/media/icons/duotune/coding/cod001.svg'
        title={t('MENU.SETTINGS')}
        fontIcon='bi-app-indicator'
      />

      {role === `SuperAdmin` && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Admin</span>
            </div>
          </div>

          <SidebarMenuItem
            icon='/media/icons/duotune/general/gen041.svg'
            title={t('MENU.CREATE.COMPANY.TITLE')}
            fontIcon='bi-app-indicator'
            onClick={handleOpenCompanyModal}
          />
          <CreateCompanyModal show={isModalCompanyOpen} handleClose={handleCloseCompanyModal} />

          <SidebarMenuItem
            to='/companies'
            icon='/media/icons/duotune/art/art002.svg'
            title={t('MENU.COMPANIES')}
            fontIcon='bi-app-indicator'
          />
        </>
      )}

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div>

      {/* <SidebarMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <SidebarMenuItem
            to='/dashboard'
            icon='/media/icons/duotune/art/art002.svg'
            title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
            fontIcon='bi-app-indicator'
          />

          <SidebarMenuItem
            to='/builder'
            icon='/media/icons/duotune/general/gen019.svg'
            title='Layout Builder'
            fontIcon='bi-layers'
          />

          <SidebarMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <SidebarMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <SidebarMenuItem
            to='/crafted/pages/profile/campaigns'
            title='Campaigns'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/documents'
            title='Documents'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <SidebarMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub>
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div> */}
      {/* <SidebarMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItem
        to='/apps/user-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='User management'
        fontIcon='bi-layers'
      /> */}
      {/* <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}

export { SidebarMenuMain }
