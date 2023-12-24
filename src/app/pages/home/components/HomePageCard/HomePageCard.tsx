import {Icon} from '@iconify/react'
import {Button, Col, Divider, Row} from 'antd'
import React from 'react'
import CountUp from 'react-countup'
import HomePageCardChart from './components/HomePageCardChart'

interface Props {
  color: string
  data: {x: string; y: number}[]
  dataName: string
  label: string
  value: number
  roleControle: boolean
}

const HomePageCard: React.FC<Props> = ({color, data, dataName, label, value, roleControle}) => {
  return (
    <div className='card'>
      {roleControle ? (
        <>
          <Row style={{alignItems: 'center'}}>
            {/* info */}
            <Col span={8}>
              <p style={{fontSize: '0.75rem', opacity: 0.5}}>{label}</p>
              <CountUp end={value} separator=',' style={{fontSize: '1.5rem'}} />
            </Col>
            {/* chart */}
            <Col span={14} style={{marginLeft: '1rem'}}>
              <HomePageCardChart color={color} data={data} dataName={dataName} />
            </Col>
          </Row>
          <Divider />
          <Row align={'middle'}>
            <Col>
              <Button type='text' style={{marginLeft: '-1rem', opacity: 0.7}}>
                Tümünü Gör
                <Icon
                  icon='formkit:arrowright'
                  style={{fontSize: '1rem', marginLeft: '0.5rem', marginTop: '-0.2rem'}}
                />
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Row justify={'space-between'} align={'top'}>
          <Col span={18}>
            <Row align={'middle'}>
              <Col span={1}>
                <div
                  style={{
                    height: '6rem',
                    width: '0.5rem',
                    borderRadius: 6,
                    backgroundColor: '#5161ce',
                  }}
                ></div>
              </Col>
              <Col span={21} style={{marginLeft: '1rem'}}>
                <p style={{fontWeight: 'bold', opacity: 0.5, fontSize: '0.9rem'}}>{label}</p>
                <CountUp end={value} separator=',' style={{fontSize: '2rem'}} />
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Icon
              icon='material-symbols:holiday-village-outline-rounded'
              style={{
                padding: '0.4rem',
                borderRadius: 6,
                backgroundColor: 'rgba(81, 97, 206, 0.15)',
                color: '#5161ce',
                fontSize: '3rem',
              }}
            />
          </Col>
        </Row>
      )}
    </div>
  )
}

export default HomePageCard
