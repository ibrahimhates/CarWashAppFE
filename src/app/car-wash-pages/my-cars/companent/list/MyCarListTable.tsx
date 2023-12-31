import React, {useState} from 'react'
import MyCarListTableBody from './MyCarListTableBody'

interface Test{
  id:string;
}

function MyCarListTable() {
  const [test,setTest] = useState<Test[]>([
    {id:crypto.randomUUID()},
    {id:crypto.randomUUID()},
  ]);

  return (
    <table className='table table-row-bordered table-row-gray-10 align-middle gs-0 gy-3'>
      <thead>
      <tr className='fw-bold text-muted'>
        <th className='min-w-60px'>Plaka</th>
        <th className='min-w-60px'>Marka</th>
        <th className='min-w-60px'>Model</th>
        <th className='min-w-60px'>Son Yikama Tarihi</th>
      </tr>
      </thead>
      <tbody>
      {
        test.map((item) => {

          return (
            <MyCarListTableBody id={item.id} />
          )
        })
      }
      </tbody>
    </table>
  )
}

export default MyCarListTable;