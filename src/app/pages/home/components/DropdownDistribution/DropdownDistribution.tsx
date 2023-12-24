/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const DropdownDistribution: FC = () => {
  const { t } = useTranslation();

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-200px'
      data-kt-menu='true'
    >


      <div className='separator mb-3 opacity-75'></div>

      <div className='menu-item px-3'>
        <a href='#' className='menu-link px-3'>
          {t('HOME.PAGE.WIDGET1.OFFICE')}
        </a>
      </div>

      <div className='menu-item px-3'>
        <a href='#' className='menu-link px-3'>
          {t('HOME.PAGE.WIDGET1.DEPARTMANT')}

        </a>
      </div>



      <div className='menu-item px-3'>
        <a href='#' className='menu-link px-3'>
          {t('HOME.PAGE.WIDGET1.TITLE')}
        </a>
      </div>

      <div className='menu-item px-3'>
        <a href='#' className='menu-link px-3'>
          {t('HOME.PAGE.WIDGET1.AGE')}

        </a>
      </div>

      <div className='menu-item px-3'>
        <a href='#' className='menu-link px-3'>
          {t('HOME.PAGE.WIDGET1.GENDER')}

        </a>
      </div>

      <div className='separator mt-3 opacity-75'></div>


    </div>
  )
}

export { DropdownDistribution }
