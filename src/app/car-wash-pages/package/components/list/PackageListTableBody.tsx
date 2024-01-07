import moment from 'moment/moment'
import React, {useState} from 'react'
import {Test} from './PackageListTable'

export interface Arac {
  paketAd: string
  aciklama: string
  sure: string
  fiyat: string
}

const PackageListTableBody = ({status, id}: Test) => {
  const [arac, setArac] = useState<Arac>({
    paketAd: 'IC DIS',
    aciklama: 'Ic dis olmak uzere normal bir sekilde yikanir ve temizlenir',
    sure: '120 dk',
    fiyat: '140 TL',
  })

  return (
    <tr key={id}>
      <td className='fw-bold'>{arac.paketAd}</td>
      <td>{arac.aciklama}</td>
      <td>{arac.sure}</td>
      <td>{arac.fiyat}</td>
      <td>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-danger' onClick={() => {}}>
            Sil
          </button>
        </div>
      </td>
    </tr>
  )
}

export default PackageListTableBody
