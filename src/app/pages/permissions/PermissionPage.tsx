import { Outlet, Route, Routes } from 'react-router-dom'
import PermissionAndApprovalPage from './PermissionAndApprovalPage'
import { useState } from 'react'
import TabBarForPermissionToBeApprover from './PermissionToBeApproved/TabBarForPermissionToBeApprover'
import TabBarForMyRequests from './AdvanceAndPermission/TabBarForMyRequests'
import AdvanceRequestList from './AdvanceAndPermission/AdvanceRequests/AdvanceRequestList'
import TabBarForAdvanceToBeApprover from './AdvanceToBeApproved/TabBarForAdvanceToBeApprover'

export interface ILeaveRequest extends ILeaveRequestForEmp {
  approverState:string;
  name: string
}

export interface ILeaveRequestForEmp {
  id: string
  approvalState: string
  approvalProcessName: string
  totalDays: number
  startDate: string
  endDate: string
  description: string
}

export interface IAdvanceRequest extends IAdvanceRequestForEmp {
  name: string
}

export interface IAdvanceRequestForEmp {
  id: string
  approvalState: string
  amount: number
  description: string
  deliveryDate: string
}

const PermissionPage = () => {
  const [leaveRequests, setLeaveRequests] = useState<ILeaveRequest[]>([])
  const [leaveRequestsForEmployee, setLeaveRequestsEmp] = useState<ILeaveRequestForEmp[]>([])

  const [advanceRequests, setAdvanceRequests] = useState<IAdvanceRequest[]>([])
  const [advanceRequestForEmployee, setAdvanceRequestsEmp] = useState<IAdvanceRequestForEmp[]>([])

  return (
    <>
      <PermissionAndApprovalPage />
      <Routes>
        <Route element={<Outlet />}>
          <Route
            path='permission'
            element={
              <TabBarForPermissionToBeApprover
                leaveRequests={leaveRequests}
                setLeaveRequests={setLeaveRequests}
              />
            }
          />
          <Route
            path='advances'
            element={
              <TabBarForAdvanceToBeApprover
                advanceRequests={advanceRequests}
                setAdvanceRequests={setAdvanceRequests}
              />
            }
          />
          <Route
            path='myrequest'
            element={
              <TabBarForMyRequests
                advanceRequests={advanceRequestForEmployee}
                leaveRequests={leaveRequestsForEmployee}
                setAdvanceRequests={setAdvanceRequestsEmp}
                setLeaveRequests={setLeaveRequestsEmp}
              />
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default PermissionPage
