import React, {useEffect, useState} from 'react'
import PackageListTableBody from './PackageListTableBody'
import {WashPackage} from '../Package'

type Props = {
  washPackage: WashPackage[]
  fetchAllWashPackage: () => void
}

const PackageListTable = ({washPackage, fetchAllWashPackage}: Props) => {

  useEffect(() => fetchAllWashPackage(), [])

  return (
    <table className='table table-row-bordered table-row-gray-10 align-middle gs-0 gy-3'>
      <thead>
        <tr className='fw-bold text-muted'>
          <th className='min-w-80px'>Paket Ad</th>
          <th className='min-w-60px'>Aciklama</th>
          <th className='min-w-60px'>Sure</th>
          <th className='min-w-150px'>Fiyat</th>
        </tr>
      </thead>
      <tbody>
        {washPackage.map((wash) => {
          return <PackageListTableBody wash={wash} fetchAllPackage={fetchAllWashPackage}/>
        })}
      </tbody>
    </table>
  )
}

export default PackageListTable
