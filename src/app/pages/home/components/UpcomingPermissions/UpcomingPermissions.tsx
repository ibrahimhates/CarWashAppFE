import React, {FC, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import HttpService from '../../../../services/HttpService'
import moment from 'moment'
import {KTSVG} from '../../../../../_metronic/helpers'
import {customJwtDecode} from '../../../../CustomJwt'
import {useTranslation} from 'react-i18next'
import {Button, Col, Dropdown, Empty, MenuProps, Row} from 'antd'
import {Icon} from '@iconify/react'

interface DecodedToken {
  CompanyId?: string
}

interface UpcomingPermission {
  description: string
  startDate: string
  endDate: string
  approvalState: string
}

const permissionItem: MenuProps['items'] = [
  {
    key: '1',
    label: 'İzin Detayları',
  },
]

const UpcomingPermissions: FC = () => {
  const [upcomingPermissionsList, setUpcomingPermissionsList] = useState<UpcomingPermission[]>([])
  const {t} = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token: any = Cookies.get('authToken')
        const decodedToken: DecodedToken = customJwtDecode(token)
        const companyId = decodedToken.CompanyId

        if (companyId) {
          const response = await HttpService.get(`LeaveRequest/allEmployee`, token)
          console.log(response.data)

          // Tarihe göre sırala
          const sortedPermissions = response.data
            .sort((a: UpcomingPermission, b: UpcomingPermission) => {
              return moment(a.startDate).valueOf() - moment(b.startDate).valueOf()
            })
            .slice(0, 5)

          setUpcomingPermissionsList(sortedPermissions)
        } else {
          console.log('CompanyId not found in token.')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])

  // Onay durumuna göre renk sınıfını belirle
  const getApprovalStateColor = (approvalState: string): string => {
    if (approvalState === 'Onaylandı') {
      return 'success'
    } else if (approvalState === 'Bekleniyor') {
      return 'warning'
    } else {
      return 'danger'
    }
  }

  return (
    <>
      <p style={{fontSize: '1.2rem', opacity: 0.5, marginBottom: "0"}}>Son 5 İzin Talebim</p>
      {upcomingPermissionsList.length === 0 ? (
        <Empty />
      ) : (
        upcomingPermissionsList.map((item, index) => (
          <Row justify={'space-between'} style={{marginTop: "1rem"}}>
            <Col>
              <Row>
                <Col>
                  {item.approvalState === 'Onaylandı' ? (
                    <Icon
                      icon='charm:circle-tick'
                      style={{
                        padding: '0.4rem',
                        backgroundColor: 'rgba(0, 152, 121, 0.15)',
                        color: '#009879',
                        borderRadius: 8,
                        fontSize: '2.8rem',
                      }}
                    />
                  ) : (
                    <Icon
                      icon='mingcute:time-line'
                      style={{
                        padding: '0.4rem',
                        backgroundColor: 'rgba(216, 197, 82, 0.15)',
                        color: '#d8c552',
                        borderRadius: 8,
                        fontSize: '2.8rem',
                      }}
                    />
                  )}
                </Col>
                <Col style={{marginLeft: '0.5rem'}}>
                  <p style={{margin: 0, marginBottom: '-0.2rem'}}>{item.description}</p>
                  <span style={{fontSize: '0.8rem', color: '#A1A1A1'}}>
                    {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col>
              <Dropdown menu={{items: permissionItem}} placement='bottomRight' trigger={['click']}>
                <Button type='text' shape='circle'>
                  <Icon icon='mingcute:more-2-fill' style={{fontSize: '1.5rem'}} />
                </Button>
              </Dropdown>
            </Col>
          </Row>
        ))
      )}
    </>
    // <div className={`card`} style={{padding: 4}}>
    //   <div className='card-header border-0'>
    //     <h3 className='card-title fw-bold text-dark'>{t('HOME.PAGE.LISTWIDGET1.UPCOMING.PERMISSIONS')}</h3>
    //   </div>
    //   <div className='card-body py-3'>
    //     {upcomingPermissionsList.length === 0 ? (
    //       <div className='d-flex flex-column justify-content-center align-items-center'>

    //         <img
    //           src='media/icons/duotune/general/sory.png'
    //           className=''
    //           alt=''
    //           style={{ width: '250px', height: '300px' }}
    //         />

    //         <p>
    //           <b>  Hiç izin talebinde bulunmadınız.</b>
    //         </p></div>
    //     ) : (
    //       <div className='table-responsive'>
    //         <table className='table align-middle gs-0 gy-4'>
    //           <thead>
    //             <tr className='fw-bold text-muted bg-light'>
    //               <th className='min-w-130px'>Başlangıç Tarihi</th>
    //               <th className='min-w-130px'>Bitiş Tarihi</th>
    //               <th className='min-w-150px'>Onay Durumu</th>
    //             </tr>
    //           </thead>
    //           {upcomingPermissionsList.map((permission, index) => (
    //             <tbody key={index}>
    //               <tr>
    //                 <td>
    //                   <a href='#' className={`text-dark fw-bold text-hover-primary d-block mb-1 fs-6 text-${getApprovalStateColor(permission.approvalState)}`}>
    //                     {moment(permission.startDate).format('DD-MM-YYYY')}
    //                   </a>
    //                 </td>
    //                 <td>
    //                   <a href='#' className={`text-dark fw-bold text-hover-primary d-block mb-1 fs-6 text-${getApprovalStateColor(permission.approvalState)}`}>
    //                     {moment(permission.endDate).format('DD-MM-YYYY')}
    //                   </a>
    //                 </td>
    //                 <td>
    //                   <span
    //                     className={`sizeList badge badge-light-${getApprovalStateColor(permission.approvalState)} fs-5 fw-semibold`}
    //                   >
    //                     {permission.approvalState}
    //                   </span>
    //                 </td>
    //               </tr>
    //             </tbody>
    //           ))}
    //         </table>
    //       </div>
    //     )}
    //   </div>
    // </div>
  )
}

export {UpcomingPermissions}
