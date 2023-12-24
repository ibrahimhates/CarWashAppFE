import { useState } from "react";
import ApprovalAddedButton from "./Create/ApprovalAddedButton";
import ListApprovalProcesses from "./List/ListApprovalProcesses";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { IApprovalProcess } from "../SettingRoute";
import { customJwtDecode } from "../../../CustomJwt";

type Props = {
    approvalProcesses: IApprovalProcess[];
    setApprovalProcesses: (all: IApprovalProcess[]) => void;
}
interface DecodedToken {
    CompanyId?: string;
    Role?: string;
}


const ApprovalProcessRoute = ({ approvalProcesses, setApprovalProcesses }: Props) => {
    const [isEventFetch, setFetchEvent] = useState(false);

    const token: any = Cookies.get("authToken")
    const decodedToken: DecodedToken = customJwtDecode(token);
    const companyId = decodedToken.CompanyId;
    const role = decodedToken.Role;
    const FetchProcessRight = () => {
        setFetchEvent(true)
    }

    const FetchEvenOver = () => {
        setFetchEvent(false)
    }
    return (
        <div>
            {role === 'HesapSahibi' &&
                <ApprovalAddedButton
                    FetchProcessRight={FetchProcessRight}
                    companyId={companyId!}
                    token={token}
                />
            }

            <ListApprovalProcesses
                role={role!}
                isEventFetch={isEventFetch}
                FetchEvenOver={FetchEvenOver}
                approvalProcesses={approvalProcesses}
                setApprovalProcesses={setApprovalProcesses}
            />

        </div>
    )
}

export default ApprovalProcessRoute;

