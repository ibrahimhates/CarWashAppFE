import React, {useState} from 'react'
import EmployeeListTableBody from './EmployeeListTableBody'
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
          <th className='min-w-60px'>Ad</th>
          <th className='min-w-60px'>Soyad</th>
          <th className='min-w-60px'>Posizyon</th>
          <th className='min-w-60px'>Giris Tarihi</th>
        </tr>
      </thead>
      <tbody>
      {
        test.map((item) => {

          return(
            <EmployeeListTableBody status={item.status} id={item.id} />
          )
        })
      }
      </tbody>
    </table>
  )
}

export default AppointmentListTable
