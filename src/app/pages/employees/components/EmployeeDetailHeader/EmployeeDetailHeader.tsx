import React, { useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { Dropdown1 } from '../../../../../_metronic/partials'
import { useLocation } from 'react-router'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { headerDetail } from '../../EmployeeDetailPage'
import HttpService from '../../../../services/HttpService'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { BeatLoader } from 'react-spinners'

type Props = {
  headerDetail: any;
  setHeaderDetail: (headerDetail: headerDetail) => void;
  loading: boolean
  setLoading: (loading: boolean) => void
}



const EmployeeDetailHeader: React.FC<Props> = ({ headerDetail, setHeaderDetail, loading, setLoading }) => {
  const location = useLocation()
  const { id } = useParams<any>()

  useEffect(() => {
    setLoading(true)
    HttpService.get('User/profile/header/' + id).then(({ data }) => {
      console.log(data)
      setHeaderDetail(data)
      console.log(headerDetail.fullName)
      setLoading(false)
    })
  }, [])

  return (
    <>
      {
        loading ? (
          <div className='d-flex justify-content-center align-items-center'>
            <BeatLoader color='#0095e8' loading={loading} size={20} />
          </div>
        ) : (
          <div className='card mb-5 mb-xl-10'>
            <div className='card-body pt-9 pb-0'>
              <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>

                <div className='me-7 mb-4'>
                  <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                    {headerDetail.profilePicture != "" ?
                      (
                        <LazyLoadImage
                          src={`data:image/png+svg+xml;base64,${headerDetail.profilePicture}`}
                          alt={`${headerDetail?.fullName} Photo`}
                          effect='blur'
                          width={160}
                          height={160}
                          visibleByDefault
                        />
                      )
                      : (
                        <span className={`symbol-label bg-light-primary text-danger fs-5 fw-bolder`}>
                          {headerDetail?.fullName?.charAt(0)}

                        </span>
                      )

                    }
                  </div>
                </div>

                <div className='flex-grow-1'>
                  <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                    <div className='d-flex flex-column'>
                      <div className='d-flex align-items-center mb-2'>
                        <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                          {headerDetail.fullName}
                        </a>


                        {
                          headerDetail.isActive ? (
                            <span className='btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3'>
                              Aktif Çalışan
                            </span>
                          ) : (
                            <span className='badge badge-light-danger me-2 fs-8 fw-bolder my-2'>
                              Pasif Çalışan
                            </span>
                          )
                        }

                      </div>

                      <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>

                        {headerDetail.address != null && (
                          <span
                            className='d-flex align-items-center text-gray-400  me-5 mb-2'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen018.svg'
                              className='svg-icon-4 me-1'
                            />
                            {headerDetail.address}
                          </span>
                        )}



                        {headerDetail.email != "" && (
                          <a
                            href={`mailto:${headerDetail.email}`}
                            className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2 cursor-pointer'
                          >
                            <KTSVG
                              path='/media/icons/duotune/communication/com011.svg'
                              className='svg-icon-4 me-1'
                            />
                            {headerDetail.email}
                          </a>
                        )}

                        {
                          headerDetail.businessPhoneNumber != "" && (
                            <span
                              className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                            >
                              <KTSVG
                                path='/media/icons/duotune/communication/com005.svg'
                                className='svg-icon-4 me-1'
                              />
                              {headerDetail.businessPhoneNumber}
                            </span>
                          )
                        }


                      </div>
                    </div>


                  </div>

                  <div className='d-flex flex-wrap flex-stack'>
                    <div className='d-flex flex-column flex-grow-1 pe-8'>
                      <div className='d-flex flex-wrap'>

                        {
                          headerDetail.title != null && (
                            <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                              <div className='d-flex align-items-center'>
                                <KTSVG
                                  path='/media/icons/duotune/communication/com006.svg'
                                  className='svg-icon-3 svg-icon-danger me-2'
                                />
                                <div className='fs-2 fw-bolder'>{headerDetail.title}</div>
                              </div>

                              <div className='fw-bold fs-6 text-gray-400'>Ünvan</div>
                            </div>
                          )
                        }



                      </div>
                    </div>


                  </div>
                </div>
              </div>

              <div className='d-flex overflow-auto h-55px'>
                <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === `/employees/profiledetail/${id}/detail` && 'active')
                      }
                      to={`/employees/profiledetail/${id}/detail`}
                    >
                      Profil
                    </Link>
                  </li>


                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === `/employees/profiledetail/${id}/infos` && 'active')
                      }
                      to={`/employees/profiledetail/${id}/infos`}
                    >
                      Genel Bilgiler
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === `/employees/profiledetail/${id}/other/infos` && 'active')
                      }
                      to={`/employees/profiledetail/${id}/other/infos`}
                    >
                      Diğer Bilgiler
                    </Link>
                  </li>


                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === `/employees/profiledetail/${id}/permission/infos` && 'active')
                      }
                      to={`/employees/profiledetail/${id}/permission/infos`}
                    >
                      İzin Bilgileri
                    </Link>
                  </li>



                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === `/employees/profiledetail/${id}/payment/infos` && 'active')
                      }
                      to={`/employees/profiledetail/${id}/payment/infos`}
                    >
                      Avans Bilgileri
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === `/employees/profiledetail/${id}/payments` && 'active')
                      }
                      to={`/employees/profiledetail/${id}/payments`}
                    >
                      Ödemeler
                    </Link>
                  </li>



                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === `/employees/profiledetail/${id}/inventory` && 'active')
                      }
                      to={`/employees/profiledetail/${id}/inventory`}
                    >
                      Zimmet
                    </Link>
                  </li>





                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === `/employees/profiledetail/${id}/salary` && 'active')
                      }
                      to={`/employees/profiledetail/${id}/salary`}
                    >
                      Maaş
                    </Link>
                  </li>



                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === `/employees/profiledetail/${id}/position` && 'active')
                      }
                      to={`/employees/profiledetail/${id}/position`}
                    >
                      Pozisyon
                    </Link>
                  </li>


                </ul>
              </div>
            </div>
          </div>
        )
      }


    </>
  )
}

export { EmployeeDetailHeader }
