/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'

type Props = {
  className: string
}

const PersonalPayments: React.FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-150px'>Ödeme Türü</th>
                <th className='min-w-140px'>Tutar</th>
                <th className='min-w-120px'>Birimi</th>
                <th className='min-w-120px'>Açıklama</th>
                <th className='min-w-120px'>Oluşturulma Tarihi</th>
                <th className='min-w-120px'>Ödenme Tarihi</th>
                <th className='min-w-120px'>Sonuç</th>
                <th className='min-w-100px text-end'>Eylemler</th>
              </tr>
            </thead>
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                    Prim
                  </a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    50.000
                  </a>                  
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                  $
                  </a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    Çok Çalıştığı İçin
                  </a>
                </td>
                <td className='text-dark fw-bold text-hover-primary fs-6'>16.08.2023</td>
                <td className='text-dark fw-bold text-hover-primary fs-6'>28.08.2023</td>
                <td>
                  <span className='badge badge-light-success'>Onaylandı</span>
                </td>
                <td className='text-end'>                  
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export {PersonalPayments}
