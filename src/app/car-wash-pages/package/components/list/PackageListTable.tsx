import React, {useState} from 'react'
import PackageListTableBody from './PackageListTableBody'

export interface Test{
  status:boolean;
  id:string
}

const PackageListTable = () => {
  const [test,setTest] = useState<Test[]>([
    {status: false,id:crypto.randomUUID()},
    {status : true,id:crypto.randomUUID()},
    {status:true,id:crypto.randomUUID()},
    {status :true,id:crypto.randomUUID()}
  ]);

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
      {
        test.map((item) => {
          return (
            <PackageListTableBody status={item.status} id={item.id} />
          )
        })
      }
      </tbody>
    </table>
  )
}

export default PackageListTable;