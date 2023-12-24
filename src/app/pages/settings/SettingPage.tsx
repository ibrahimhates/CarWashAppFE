import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { Link, useLocation } from 'react-router-dom'
import { customJwtDecode } from '../../CustomJwt'
type decoder = {
  Role?: string
}

const SettingPage = () => {
  const location = useLocation()
  const token: any = Cookies.get('authToken')
  const decod: decoder = customJwtDecode(token)
  const role = decod.Role;

  return (
    <div className='card mb-10'>
      <div className='card-body pt-3 pb-0'>
        <div className='d-flex overflow-auto h-45px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            {role !== 'Calisan' && (
              <>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/settings/compunitset` && 'active')
                    }
                    to={`compunitset`}
                  >
                    Sirket yapisi
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/settings/studyshapeset` && 'active')
                    }
                    to={`studyshapeset`}
                  >
                    Calisma Sekli
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/settings/approvalprocess` && 'active')
                    }
                    to={`approvalprocess`}
                  >
                    Onay Surecleri
                  </Link>
                </li>
              </>
            )}
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/settings/profilSetting` && 'active')
                }
                to={`profilSetting`}
              >
                Profil Ayarlari
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SettingPage
