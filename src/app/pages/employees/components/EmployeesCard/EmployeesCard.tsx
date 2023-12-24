/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { KTSVG } from '../../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
type Props = {
  id: string
  color?: string
  profilePicture: string
  fullName: string
  number: string
  email: string
  isActive: boolean
  role: string
}

const EmployeesCard: FC<Props> = ({
  id,
  color = '',
  profilePicture,
  fullName,
  number,
  email,
  isActive,
  role
}) => {
  const { t } = useTranslation();
  return (
    <div className={`card ${isActive ? '' : 'bg-light-gray'}`}>
      <div className='card-body d-flex flex-center flex-column p-9'>
        {/* <span className='badge badge-light-primary position-absolute top-0 start-0 mt-3 ms-3 fs-6'>
          {role}
        </span> */}
        <div className='mb-5'>
          <div className='symbol symbol-75px symbol-circle'>
            {profilePicture ? (

              <img
                alt={`${fullName} photo`}
                src={`data:image/png+svg+xml;base64,${profilePicture}`}
              />
            ) : (

              <span className={`symbol-label bg-light-primary text-danger fs-5 fw-bolder`}>
                {fullName.charAt(0)}
              </span>
            )}

          </div>
        </div>
        <Link to={`profiledetail/${id}/detail`}>
          <span className='fs-4 text-gray-800 text-hover-primary fw-bolder mb-0'>
            {fullName}
          </span>
        </Link>




        <div className='d-flex flex-center flex-wrap mb-5'>
          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mx-3 mb-3'>
            <div className='fs-6 fw-bolder text-gray-700'>{number}</div>
          </div>


        </div>

        <button className='btn btn-sm btn-light-primary fw-bolder' onClick={() => window.location.href = `mailto:${email}`}>
          <KTSVG path={"/media/icons/duotune/general/gen016.svg"} className='svg-icon-2' />
          {t('EMPLOYEES.PAGE.PROFILE.CARD.SEND.MAIL')}
        </button>

      </div>
    </div>
  )
}

export { EmployeesCard }
