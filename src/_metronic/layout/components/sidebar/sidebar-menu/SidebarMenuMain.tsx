import React, {useEffect, useState} from 'react'
import {SidebarMenuItem} from './SidebarMenuItem'
import Cookies from 'js-cookie'
import {customJwtDecode} from '../../../../../app/CustomJwt'

type tokenModel = {
  whoseToken: string
  role: string
}

const SidebarMenuMain = () => {
  const token: any = Cookies.get(`authToken`)
  const roles: tokenModel = customJwtDecode(token)

  return (
    <>
      {/*
      ***********************************************************************************************
      Bizim Uygulama
      */}
      {/*Randevular*/}
      {roles.whoseToken === 'Employee' && roles.role !== 'Worker' && (
        <SidebarMenuItem
          to={`/appointments`}
          icon='/icons/sidebar/gen014.svg'
          title={'Randevular'}
          fontIcon='bi-app-indicator'
        />
      )}

      {roles.whoseToken === 'Employee' && roles.role === 'Worker' && (
        <SidebarMenuItem
          to={`/appointments`}
          icon='/icons/sidebar/gen014.svg'
          title={'Randevular'}
          fontIcon='bi-app-indicator'
        />
      )}

      {roles.whoseToken === 'Customer' && (
        <SidebarMenuItem
          to={`/appointments`}
          icon='/icons/sidebar/gen014.svg'
          title={'Randevular'}
          fontIcon='bi-app-indicator'
        />
      )}

      {/*Calisanlar*/}
      {roles.whoseToken === 'Employee' && roles.role !== 'Worker' && (
        <SidebarMenuItem
          to={`/employees`}
          icon='/icons/sidebar/com014.svg'
          title={'Çalışanlar'}
          fontIcon='bi-app-indicator'
        />
      )}

      {/*Paketler*/}
      {roles.whoseToken === 'Employee' && roles.role !== 'Worker' && (
        <SidebarMenuItem
          to={`/packages`}
          icon='/icons/sidebar/ecm007.svg'
          title={'Paketler'}
          fontIcon='bi-app-indicator'
        />
      )}

      {/*Araclarim*/}
      {roles.whoseToken === 'Customer' && (
        <SidebarMenuItem
          to={`/mycars`}
          icon='/icons/sidebar/ecm006.svg'
          title={'Araclarim'}
          fontIcon='bi-app-indicator'
        />
      )}

      {/*Raporlar*/}
      {roles.whoseToken === 'Employee' && roles.role !== 'Worker' && (
        <SidebarMenuItem
          to={`/reports`}
          icon='/icons/sidebar/gen005.svg'
          title={'Raporlar'}
          fontIcon='bi-app-indicator'
        />
      )}

      {/*Profile*/}
      <SidebarMenuItem
        to={`/profiles`}
        icon='/icons/sidebar/com013.svg'
        title={'Profil'}
        fontIcon='bi-app-indicator'
      />
    </>
  )
}

export {SidebarMenuMain}
