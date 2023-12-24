import {Dispatch, FC, SetStateAction, useState} from 'react'
import {PageTitle} from '../../../../../_metronic/layout/core'
import {useLayout} from '../../../../../_metronic/layout/core'
import {StatisticsWidget2, StatisticsWidget6} from '../../../../../_metronic/partials/widgets'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useTranslation} from 'react-i18next'
import {Button, Card, Col, DatePicker, Divider, Modal, Progress, Row, Select, Tag} from 'antd'
import {Icon} from '@iconify/react'
const {RangePicker} = DatePicker

interface Props {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const Home: FC<Props> = ({openModal, setOpenModal}: Props) => (
  <>
    {/* begin::Row1 */}
    <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
      <div className='card-header cursor-pointer'>
        <div className='card-title m-0'>
          <Row align={'middle'}>
            <Col>
              <h3 className='fw-bolder m-0'>İzin Bilgileri</h3>
            </Col>
            <Col style={{marginLeft: '1rem'}}>
              <Button type='text' shape='circle' onClick={() => setOpenModal(true)}>
                <Icon icon='uil:edit' style={{fontSize: '1.5rem'}} />
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      <Row style={{marginLeft: '2rem', marginTop: '1rem'}}>
        <Col span={24}>
          <Row>
            <Col xxl={3} lg={6} xs={12}>
              <Card
                title='Kullanılan Yıllık İzin'
                size='small'
                bodyStyle={{backgroundColor: 'white'}}
                headStyle={{backgroundColor: 'white'}}
              >
                <Row justify={'center'}>
                  <Col>
                    <span className='badge badge-light-primary' style={{fontSize: '1.2rem'}}>
                      12 Gün
                    </span>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xxl={3} lg={6} xs={12}>
              <Card
                title='Kalan Yıllık İzin'
                size='small'
                bodyStyle={{backgroundColor: 'white'}}
                headStyle={{backgroundColor: 'white'}}
                style={{marginLeft: '1rem'}}
              >
                <Row justify={'center'}>
                  <Col>
                    <span className='badge badge-light-success' style={{fontSize: '1.2rem'}}>
                      25 Gün
                    </span>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xxl={18} lg={12} xs={24}>
              <Card
                title='Kalan Yıllık İzin Oranı'
                size='small'
                bodyStyle={{backgroundColor: 'white'}}
                headStyle={{backgroundColor: 'white'}}
                style={{marginLeft: '1rem'}}
              >
                <Progress percent={60} />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{marginTop: '2rem'}}>
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>İzin Türü</th>
                  <th className='min-w-140px'>Başlama Tarihi</th>
                  <th className='min-w-120px'>Bitiş Tarihi</th>
                  <th className='min-w-100px text-end'>Eylemler</th>
                </tr>
              </thead>
              {/* begin::Table body */}
              <tbody>
                <tr>
                  <td className='text-dark fw-bold text-hover-primary fs-6'>Yıllık İzin</td>
                  <td className='text-dark fw-bold text-hover-primary fs-6'>28.08.2023</td>
                  <td className='text-dark fw-bold text-hover-primary fs-6'>10.09.2023</td>
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
        </Col>
      </Row>

      <Modal
        title='Yeni İzin Kaydı Oluştur'
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        okText='Oluştur'
        cancelText='İptal Et'
      >
        <Select
          placeholder='İzin Türü Seçiniz'
          style={{width: '50%'}}
          options={[
            {value: '1', label: 'Yıllık İzin'},
            {value: '2', label: 'Doğum İzni'},
            {value: '3', label: 'Babalık İzni'},
            {value: '4', label: 'Taşınma İzni'},
          ]}
        />

        <RangePicker placeholder={["Başlangıç Tarihi", "Bitiş Tarihi"]} format={'DD/MM/YYYY'} style={{marginTop: "1rem"}}/>
      </Modal>

      {/* <div className='row g-5 g-xl-8'>
        <div className='col-xl-4'>
          <StatisticsWidget2
            className='card-xl-stretch mb-xl-8'
            avatar='/media/svg/avatars/014-girl-7.svg'
            title='TOPLAM İZİN GÜNÜ'
            description='30 GÜN'
          />
        </div>

        <div className='col-xl-4'>
          <StatisticsWidget6
            className='card-xl-stretch mb-xl-8'
            color='success'
            title='6 GÜN'
            description='KALAN İZİN'
            progress='15%'
          />
        </div>

        <div className='col-xl-4'>
          <StatisticsWidget6
            className='card-xl-stretch mb-xl-8'
            color='danger'
            title='24 GÜN'
            description='HARCANAN İZİN'
            progress='76%'
          />
        </div>
      </div> */}
      {/* <div className='card-body p-9'>
        <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
          <KTSVG
            path='icons/duotune/general/gen044.svg'
            className='svg-icon-2tx svg-icon-warning me-4'
          />
          <div className='d-flex flex-stack flex-grow-1'>
            <div className='fw-bold'>
              <h4 className='text-gray-800 fw-bolder'>
                "[firma ismi] firmasına ait izin kuralları"
              </h4>
              <div className='fs-6 text-gray-600'>
                -Her bir çalışanın toplam izin günü özel günler dahil olmaksızın yıllık 30 iş
                günüdür.
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
    {/* end::Row */}
  </>
)

const EmployeePermissionInfos: FC = () => {
  const {t} = useTranslation()
  const {setToolbarType} = useLayout()
  const [openModal, setOpenModal] = useState(false)

  // const useMountEffect = (fun: any) => useEffect(fun, [])

  // useMountEffect(() => {
  //   setToolbarType('classic')
  // })

  return (
    <>
      <PageTitle breadcrumbs={[]}>{t('MENU.DASHBOARD')}</PageTitle>
      <Home openModal={openModal} setOpenModal={setOpenModal} />
    </>
  )
}

export {EmployeePermissionInfos}
