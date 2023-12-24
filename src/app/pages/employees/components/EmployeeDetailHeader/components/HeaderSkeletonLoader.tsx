import { Skeleton } from 'antd'
import React from 'react'

const HeaderSkeletonLoader = () => {
  return (
    <>
      <div style={{display: 'flex', width: '50%'}}>
        <Skeleton.Image active style={{width: '10rem', height: '10rem'}} />
        <Skeleton active style={{marginLeft: '1rem'}} />
      </div>
      <div style={{display: 'flex'}}>
        <Skeleton.Input active style={{marginTop: '5rem', marginBottom: '1rem'}} size='small' />
        <Skeleton.Input
          active
          style={{marginTop: '5rem', marginBottom: '1rem', marginLeft: '1rem'}}
          size='small'
        />
        <Skeleton.Input
          active
          style={{marginTop: '5rem', marginBottom: '1rem', marginLeft: '1rem'}}
          size='small'
        />
        <Skeleton.Input
          active
          style={{marginTop: '5rem', marginBottom: '1rem', marginLeft: '1rem'}}
          size='small'
        />
        <Skeleton.Input
          active
          style={{marginTop: '5rem', marginBottom: '1rem', marginLeft: '1rem'}}
          size='small'
        />
        <Skeleton.Input
          active
          style={{marginTop: '5rem', marginBottom: '1rem', marginLeft: '1rem'}}
          size='small'
        />
        <Skeleton.Input
          active
          style={{marginTop: '5rem', marginBottom: '1rem', marginLeft: '1rem'}}
          size='small'
        />
      </div>
      <div style={{width: '100%', display: 'flex'}}>
        <Skeleton.Input active style={{marginTop: '1rem'}} size='small' />
        <Skeleton.Input
          active
          style={{marginTop: '1rem', marginLeft: '1rem', width: '80%'}}
          size='small'
          block
        />
      </div>
      <div style={{width: '100%', display: 'flex'}}>
        <Skeleton.Input active style={{marginTop: '1rem'}} size='small' />
        <Skeleton.Input
          active
          style={{marginTop: '1rem', marginLeft: '1rem', width: '50%'}}
          size='small'
          block
        />
      </div>
      <div style={{width: '100%', display: 'flex'}}>
        <Skeleton.Input active style={{marginTop: '1rem'}} size='small' />
        <Skeleton.Input
          active
          style={{marginTop: '1rem', marginLeft: '1rem', width: '60%'}}
          size='small'
          block
        />
      </div>
      <div style={{width: '100%', display: 'flex'}}>
        <Skeleton.Input active style={{marginTop: '1rem'}} size='small' />
        <Skeleton.Input
          active
          style={{marginTop: '1rem', marginLeft: '1rem', width: '70%'}}
          size='small'
          block
        />
      </div>
      <div style={{width: '100%', display: 'flex'}}>
        <Skeleton.Input active style={{marginTop: '1rem'}} size='small' />
        <Skeleton.Input
          active
          style={{marginTop: '1rem', marginLeft: '1rem', width: '90%'}}
          size='small'
          block
        />
      </div>
      <div style={{width: '100%', display: 'flex'}}>
        <Skeleton.Input active style={{marginTop: '1rem'}} size='small' />
        <Skeleton.Input
          active
          style={{marginTop: '1rem', marginLeft: '1rem', width: '80%'}}
          size='small'
          block
        />
      </div>
    </>
  )
}

export default HeaderSkeletonLoader
