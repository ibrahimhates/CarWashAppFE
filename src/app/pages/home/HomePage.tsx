/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {useLayout} from '../../../_metronic/layout/core'
import {HomeChart} from './components/HomeChart/HomeChart'
import {UpcomingPermissions} from './components/UpcomingPermissions/UpcomingPermissions'
import {RecentRequests} from './components/RecentRequests/ListsWidgetHomePageRecentRequest'
import {Holidays} from './components/Holidays/Holidays'
import {Birthdays} from './components/Birthdays/Birthdays'
import {HomePermissions} from './components/HomePermissions/HomePermissions'
import {useTranslation} from 'react-i18next'
import HomePageCard from './components/HomePageCard/HomePageCard'
import {
  Avatar,
  Button,
  Col,
  Divider,
  Dropdown,
  MenuProps,
  Progress,
  Row,
  Space,
  Timeline,
  notification,
} from 'antd'
import HomePageDonutChart from './components/Charts/components/HomePageDonutChart'
import {Icon} from '@iconify/react'
import HomePageBarChart from './components/Charts/components/HomePageBarChart'
import Cookies from 'js-cookie'
import {customJwtDecode} from '../../CustomJwt'
import {NotificationPlacement} from 'antd/es/notification/interface'
import HttpService from '../../services/HttpService'

type Props = {
  data: {x: string; y: number}[]
  roleControle: boolean
}

const donutItems: MenuProps['items'] = [
  {
    key: '1',
    label: 'Çalışan Pozisyon Dağılımı',
  },
  {
    key: '2',
    label: 'Çalışan Cinsiyet Dağılımı',
  },
  {
    key: '3',
    label: 'Çalışan Yaş Dağılımı',
  },
]

const barItems: MenuProps['items'] = [
  {
    key: '1',
    label: 'IK Bütçe Detayları',
  },
  {
    key: '2',
    label: 'IK Giderleri',
  },
]

const Home: FC<Props> = ({data, roleControle}) => (
  <>
    <Row justify={'space-between'}>
      <Col xs={24} xxl={18} style={{marginTop: '1rem'}}>
        <Row justify={'space-between'}>
          <Col xs={24} md={8}>
            <HomePageCard
              color='#5161ce'
              data={data}
              dataName='Deneme'
              label={roleControle ? 'Çalışan Sayısı' : 'Toplam Kullandığım İzin'}
              value={roleControle ? 159 : 56}
              roleControle={roleControle}
            />
          </Col>
          <Col xs={24} md={8}>
            <HomePageCard
              color='#51CE9A'
              data={data}
              dataName='Deneme'
              label={roleControle ? 'IK İçin Ayırılan Bütçe (₺)' : 'Toplam Aldığım Avans (₺)'}
              value={roleControle ? 501251 : 5621}
              roleControle={roleControle}
            />
          </Col>
          <Col xs={24} md={7}>
            <HomePageCard
              color='#CECC51'
              data={data}
              dataName='Deneme'
              label={roleControle ? 'Aktif Proje Sayısı' : 'Sonuçlandırdığım Talep'}
              value={12}
              roleControle={roleControle}
            />
          </Col>
        </Row>

        {roleControle && (
          <Row justify={'space-between'}>
            <Col xs={24} xl={9} className='card'>
              <Row justify={'space-between'} align={'middle'}>
                <Col>
                  <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Çalışan Pozisyon Dağılımı</p>
                </Col>
                <Col>
                  <Dropdown menu={{items: donutItems}} placement='bottomRight' trigger={['click']}>
                    <Button type='text' shape='circle'>
                      <Icon icon='mingcute:more-2-fill' style={{fontSize: '1.5rem'}} />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
              <HomePageDonutChart />
            </Col>
            <Col xs={24} xl={14} className='card'>
              <Row justify={'space-between'} align={'middle'} style={{marginBottom: '1rem'}}>
                <Col>
                  <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                    İnsan Kaynakları Bütçe Detayları
                  </p>
                </Col>
                <Col>
                  <Dropdown menu={{items: barItems}} placement='bottomRight' trigger={['click']}>
                    <Button type='text' shape='circle'>
                      <Icon icon='mingcute:more-2-fill' style={{fontSize: '1.5rem'}} />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
              <HomePageBarChart />
            </Col>
          </Row>
        )}

        <Row>
          <Col span={24}>
            <RecentRequests className='h-md-100' />
          </Col>
        </Row>

        {/* begin::Row1 */}
        {/* <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
          <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-4 mb-md-5 mb-xl-10'>
            <HomeChart className='h-md-100' chartColor='e5e510' chartHeight='275px' />
          </div>
          <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-5 mb-md-5 mb-xl-10'>
            <UpcomingPermissions className='h-md-100' />
          </div>
          <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
            <HomePermissions className=' mb-5' />
          </div>
        </div> */}
        {/* end::Row */}

        {/* begin::Row2 */}

        {/* <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
          <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
            <Birthdays className='h-md-100' />
          </div>
          <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
            <Holidays className='h-md-100' />
          </div>
          <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10'>
            <RecentRequests className='h-md-100' />
          </div>
        </div> */}
      </Col>
      <Col xs={24} xxl={6} style={{paddingLeft: '2rem'}}>
        <Row style={{marginTop: '1rem'}}>
          <Col className='card' span={24}>
            <UpcomingPermissions />
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Row className='card'>
              <Col span={24}>
                <p style={{fontSize: '1.1rem', opacity: 0.5}}>Yıllık Kalan İzinlerim</p>
                <Row justify={'space-between'}>
                  <Col span={24}>
                    <Row align={'bottom'} justify={'center'}>
                      <Col>
                        <Progress
                          type='circle'
                          size={'small'}
                          percent={65}
                          style={{fontSize: '10px'}}
                        />
                        <p
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            marginTop: '0.5rem',
                            marginBottom: '0',
                          }}
                        >
                          12 Gün
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={15}></Col>
                </Row>
                <Row align={'middle'} style={{marginTop: '2rem'}}>
                  <Col>
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
                  </Col>
                  <Col style={{marginLeft: '0.5rem'}}>
                    <p style={{margin: 0, marginBottom: '-0.2rem'}}>Bayram Tatili</p>
                    <span style={{fontSize: '0.8rem', color: '#A1A1A1'}}>23/04/2023</span>
                  </Col>
                </Row>
                {/* <UpcomingPermissions className='' /> */}
              </Col>
            </Row>

            <div className='card' style={{marginTop: '1rem'}}>
              <Birthdays />
            </div>
          </Col>
          <Col span={12} style={{paddingLeft: '1rem'}}>
            <div className='card'>
              <Holidays />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </>
)

const HomePage: FC = () => {
  const {t} = useTranslation()
  const {setToolbarType} = useLayout()

  const chartData: {x: string; y: number}[] = [
    {
      x: 'Data 1',
      y: 12,
    },
    {
      x: 'Data 2',
      y: 24,
    },
    {
      x: 'Data 3',
      y: 11,
    },
    {
      x: 'Data 4',
      y: 42,
    },
    {
      x: 'Data 5',
      y: 33,
    },
    {
      x: 'Data 6',
      y: 37,
    },
  ]

  const roleControl = () => {
    const token: any = Cookies.get('authToken')
    const decodedToken: any = customJwtDecode(token)

    return (
      decodedToken.Role === 'Yonetici' ||
      decodedToken.Role === 'HesapSahibi' ||
      decodedToken.Role === 'SuperAdmin'
    )
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{t('MENU.DASHBOARD')}</PageTitle>
      <Home data={chartData} roleControle={roleControl()} />
    </>
  )
}

export {HomePage}
