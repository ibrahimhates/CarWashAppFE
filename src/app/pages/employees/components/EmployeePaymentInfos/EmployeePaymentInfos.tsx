import React from 'react'
import { FC } from 'react'
import { PageTitle } from '../../../../../_metronic/layout/core'
import { useLayout } from '../../../../../_metronic/layout/core'
import { PersonalPaymentInfos } from '../PersonalPaymentInfos/PersonalPaymentInfos'
import { useTranslation } from 'react-i18next'


const Home: FC = () => (
  <>

    {/* begin::Row1 */}
    <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
      <div className='col-md-12 col-lg-6 col-xl-12 col-xxl-12 mb-md-5 mb-xl-10'>
        <PersonalPaymentInfos className='h-md-100' />
      </div>
    </div>
    {/* end::Row */}

  </>
)

const EmployeePaymentInfos: FC = () => {
  const { setToolbarType } = useLayout();
  const { t } = useTranslation()
  // const useMountEffect = (fun: any) => useEffect(fun, [])

  // useMountEffect(() => {
  //   setToolbarType('classic')
  // })

  return (
    <>
      <PageTitle breadcrumbs={[]}>{t('MENU.DASHBOARD')}</PageTitle>
      <Home />
    </>
  )
}

export { EmployeePaymentInfos }