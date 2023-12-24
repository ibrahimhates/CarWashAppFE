import {Avatar, Button, Tooltip} from 'antd'
import {type} from 'os'
import React from 'react'
import { Icon } from '@iconify/react';

type Props = {
  message: string
}

const InfoBox = ({message}: Props) => {
  return (
    <Tooltip title={message}>
        <Icon icon='ph:info' style={{fontSize: "1.2rem"}}/>
    </Tooltip>
  )
}

export default InfoBox
