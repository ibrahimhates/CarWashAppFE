import { useEffect, useState } from 'react';
import HttpService from '../../../../services/HttpService';
import Cookies from 'js-cookie';
import ApprvovalListCard from './ApprovalListCard';
import { IApprovalProcess } from '../../SettingRoute';
import { customJwtDecode } from '../../../../CustomJwt';

interface DecodedToken {
    CompanyId?: string;
}

type Props = {
    isEventFetch: boolean;
    FetchEvenOver: () => void;
    approvalProcesses: IApprovalProcess[];
    setApprovalProcesses: (all: IApprovalProcess[]) => void;
    role: string;
}

const ListApprovalProcesses = ({ isEventFetch, FetchEvenOver, approvalProcesses, setApprovalProcesses, role }: Props) => {
    const token: any = Cookies.get("authToken")
    const decodedToken: DecodedToken = customJwtDecode(token);
    const companyId = decodedToken.CompanyId;

    const [approvalProcess, setApprovalProcess] = useState<IApprovalProcess>();

    useEffect(() => {
        const approvalP = approvalProcesses?.find(app => app.name === 'Default');
        setApprovalProcess(approvalP)
    }, [approvalProcesses])

    useEffect(() => {
        FetchApprovalData()
    }, [])

    useEffect(() => {
        if (isEventFetch)
            FetchApprovalData()
    })

    const FetchApprovalData = () => {
        HttpService.get(`ApprovalProcesses/all/${companyId}`, Cookies.get("authToken"))
            .then((response) => {
                setApprovalProcesses(response.data);
                FetchEvenOver();
            })
            .catch((e) => {
                console.log(e);
            })
    }
    return (
        <div>
            {approvalProcess &&
                <ApprvovalListCard
                    userQueues={approvalProcess.userQueues}
                    approvalName={approvalProcess.name}
                    isDefault={true}
                />
            }
            {approvalProcesses && approvalProcesses.map(approval => {
                if (approval.name !== 'Default')
                    return (
                        <ApprvovalListCard
                            userQueues={approval.userQueues}
                            approvalName={approval.name}
                            isDefault={false}
                            id={approval.id}
                            refreshData={FetchApprovalData}
                            role={role}
                        />
                    )
                return null;
            })}

        </div>
    )
}

export default ListApprovalProcesses;