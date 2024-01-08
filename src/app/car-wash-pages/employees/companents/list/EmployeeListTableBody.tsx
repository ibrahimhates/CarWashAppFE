import moment from 'moment'
import React, {useState} from 'react'
import {EmployeeList} from '../Employee'


type Props = {
  employee:EmployeeList
}

const EmployeeListTableBody = ({employee} :Props) => {
  const [showUpdate,setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);

  return (
    <tr key={employee.userId}>
      <td className='fw-bold'>{employee.fullName}</td>
      <td>{employee.roleName}</td>
      <td>{moment(employee.hireDate).format('YYYY-MM-DD')}</td>
      <td>
        <div className='d-flex justify-content-center'>
            <>
              <button className='btn btn-secondary me-2' onClick={() => setShowUpdate(true)}>
                Duzenle
              </button>
            </>
        </div>
      </td>
      {/*<CreateModal handleClose={handleCloseUpdate} show={showUpdate} />*/}
    </tr>
  )
}

export default EmployeeListTableBody
