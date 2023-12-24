import {Col, Row} from 'antd'
import React from 'react'

type ReportCardProps = {
  src: string
  title: string
  desc: string
}

const ReportCard = ({desc, src, title}: ReportCardProps) => {
  return (
    <div className='card' style={{marginRight: "1rem"}}>
      <Row justify={'center'}>
        <Col>
          <img src={require(`../../../assets/images/${src}`)} alt='' style={{width: '128px', height: '128px'}} />
        </Col>
      </Row>

      <p style={{fontSize: "1.5rem", fontWeight: "bold", textAlign: "center", marginBottom: "0.5rem"}}>{title}</p>
      <p style={{textAlign: "center", color: "#9c9c9c", fontSize: "0.9rem"}}>{desc}</p>
    </div>
  )
}

export default ReportCard
