import { Icon } from '@iconify/react'
import {Avatar, Col, Row, Space} from 'antd'
import React from 'react'

type SearchItemProps = {
  src: string
  name: string
  type: string
  date: string
}

const SearchReportItem = ({date, name, src, type}: SearchItemProps) => {
  return (
    <div className='card' style={{padding: 10, marginTop: "0.7rem"}}>
      <Row align={'middle'} justify={'space-between'}>
        <Col>
          <Row align={'middle'}>
            <Col>
              <img
                src={require(`../../../assets/images/${src}`)}
                alt=''
                style={{width: '64px', height: '64px'}}
              />
            </Col>
            <Col>
              <p style={{marginBottom: '0rem', fontWeight: 'bold', fontSize: '1.1rem'}}>{name}</p>
              <Row>
                <Space size={6}>
                  <Col>
                    <span style={{fontSize: '0.8rem', color: '#9c9c9c'}}>{date}</span>
                  </Col>
                  <Col>
                    <Avatar size={4} />
                  </Col>
                  <Col>
                    <span style={{fontSize: '0.8rem', color: '#9c9c9c'}}>{type}</span>
                  </Col>
                </Space>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Icon icon='mi:options-vertical' style={{fontSize: "2rem", color: "#606060"}}/>
        </Col>
      </Row>
    </div>
  )
}

export default SearchReportItem
