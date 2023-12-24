import {Col, Input, Row} from 'antd'
import React from 'react'
import ReportCard from './components/ReportCard'
import {Icon} from '@iconify/react'
import SearchReportItem from './components/SearchReportItem'

const ReportsPage = () => {
  return (
    <Row>
      <Col xs={24} xxl={18}>
        <Row>
          <Col xs={24} md={12} xl={8}>
            <ReportCard
              desc='Bu raporun açıklaması bu kısımda olacaktır, ne işe yaradığı falan yazılabilir.'
              src='ik1.png'
              title='Turnover Raporu'
            />
          </Col>

          <Col xs={24} md={12} xl={8}>
            <ReportCard
              desc='Bu raporun açıklaması bu kısımda olacaktır, ne işe yaradığı falan yazılabilir.'
              src='ik2.png'
              title='Yıllık İzin Bakiye Raporu'
            />
          </Col>

          <Col xs={24} md={12} xl={8}>
            <ReportCard
              desc='Bu raporun açıklaması bu kısımda olacaktır, ne işe yaradığı falan yazılabilir.'
              src='ik3.png'
              title='Departman Bütçesi Raporu'
            />
          </Col>

          <Col xs={24} md={12} xl={8}>
            <ReportCard
              desc='Bu raporun açıklaması bu kısımda olacaktır, ne işe yaradığı falan yazılabilir.'
              src='ik4.png'
              title='Çıkış Nedenleri Analiz Raporu'
            />
          </Col>

          <Col xs={24} md={12} xl={8}>
            <ReportCard
              desc='Bu raporun açıklaması bu kısımda olacaktır, ne işe yaradığı falan yazılabilir.'
              src='ik5.png'
              title='Demografik Rapor'
            />
          </Col>

          <Col xs={24} md={12} xl={8}>
            <ReportCard
              desc='Bu raporun açıklaması bu kısımda olacaktır, ne işe yaradığı falan yazılabilir.'
              src='ik6.png'
              title='Kendin Oluştur'
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24} xxl={6}>
        <p style={{fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2rem'}}>Önceki Raporlar</p>

        <Row align={'middle'} justify={'space-between'} style={{marginBottom: '1rem'}}>
          <Col span={21}>
            <Input
              placeholder='Rapor arayın...'
              suffix={
                <Icon icon='ic:round-search' style={{color: '#9c9c9c', fontSize: '1.5rem'}} />
              }
              size='large'
              style={{fontSize: '1rem'}}
            />
          </Col>
          <Col span={2}>
            <div style={{padding: 6, borderRadius: 6, backgroundColor: '#407BFF'}}>
              <Icon icon='mingcute:settings-2-line' style={{fontSize: '1.5rem', color: 'white'}} />
            </div>
          </Col>
        </Row>

        <SearchReportItem
          date='29 Ekim 2023'
          name='Rapor ismi burada olacak'
          src='ik1.png'
          type='Turnover Raporu '
        />

        <SearchReportItem
          date='21 Aralık 2023'
          name='Rapor ismi burada olacak'
          src='ik2.png'
          type='Yıllık İzin Bakiye Raporu'
        />

        <SearchReportItem
          date='29 Ekim 2023'
          name='Rapor ismi burada olacak'
          src='ik3.png'
          type='Departman Bütçesi Raporu '
        />

        <SearchReportItem
          date='21 Aralık 2023'
          name='Rapor ismi burada olacak'
          src='ik2.png'
          type='Yıllık İzin Bakiye Raporu'
        />

        <SearchReportItem
          date='29 Ekim 2023'
          name='Rapor ismi burada olacak'
          src='ik1.png'
          type='Turnover Raporu '
        />

        <SearchReportItem
          date='21 Aralık 2023'
          name='Rapor ismi burada olacak'
          src='ik2.png'
          type='Yıllık İzin Bakiye Raporu'
        />

        <SearchReportItem
          date='21 Aralık 2023'
          name='Rapor ismi burada olacak'
          src='ik2.png'
          type='Yıllık İzin Bakiye Raporu'
        />
      </Col>
    </Row>
  )
}

export default ReportsPage
