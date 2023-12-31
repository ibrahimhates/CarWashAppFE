import React, {useState} from 'react'
import AppointmentListTableBody from './AppointmentListTableBody'

export interface Test{
  status:boolean;
  id:string
}
const AppointmentListTable = () => {
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
          <th className='min-w-60px'>Plaka</th>
          <th className='min-w-60px'>Marka</th>
          <th className='min-w-60px'>Model</th>
          <th className='min-w-60px'>Paket</th>
          <th className='min-w-60px'>Yikama Tarihi</th>
        </tr>
      </thead>
      <tbody>
      {
        test.map((item) => {

          return(
            <AppointmentListTableBody status={item.status} id={item.id} />
          )
        })
      }
      </tbody>
    </table>
  )
}

export default AppointmentListTable
