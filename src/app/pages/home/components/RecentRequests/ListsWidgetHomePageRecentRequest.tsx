import React from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'

type Props = {
  className: string
}

const RecentRequests: React.FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Son Talepler</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Henüz İncelenmemiş Talepler</span>
        </h3>
      </div>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-325px rounded-start'>Çalışanlar</th>
                <th className='min-w-130px'>Başlangıç Tarihi</th>
                <th className='min-w-130px'>Bitiş Tarihi</th>               
                <th className='min-w-150px'>Talep Türü</th>
                {/*<th className='min-w-200px text-end rounded-end'></th>*/}
              </tr>
            </thead>
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <img
                        src={toAbsoluteUrl('/media/stock/600x400/img-26.jpg')}
                        className=''
                        alt=''/>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>Mehmet Emin Becek</a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>.Net Senior Developer</span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>01/08/2023</a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>02/08/2023</a>
                </td>
                <td>
                  <span className='badge badge-light-primary fs-7 fw-semibold'>İzin Talebi</span>
                </td>                
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <img
                        src={toAbsoluteUrl('/media/stock/600x400/img-26.jpg')}
                        className=''
                        alt=''/>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>Mustafa Emirhan</a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>FrontEnd Senior Developer</span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>01/08/2023</a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>02/08/2023</a>
                </td>
                <td>
                  <span className='badge badge-light-danger fs-7 fw-semibold'>Avans Talebi</span>
                </td>             
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <img
                        src={toAbsoluteUrl('/media/avatars/300-5.jpg')}
                        className=''
                        alt=''/>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>Umut Onur</a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>.Net Team Leader</span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>01/08/2023</a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>02/08/2023</a>
                </td>
                <td>
                  <span className='badge badge-light-danger fs-7 fw-semibold'>Avans Talebi</span>
                </td>              
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export {RecentRequests}
