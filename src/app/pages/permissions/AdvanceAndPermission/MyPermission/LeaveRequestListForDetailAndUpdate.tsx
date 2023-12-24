import moment from "moment";
import { KTSVG } from "../../../../../_metronic/helpers";
import { TimeLineToRequestInfoModal } from "../TimeLineToRequestInfoModal";
import { UpdateToPermissionInfoModal } from "./UpdateToPermissionInfo/UpdateToPermissionInfoModal";
import { ILeaveRequestForEmp } from "../../PermissionPage";
import { useState } from "react";

type Props = {
    current: ILeaveRequestForEmp;
}

const LeaveRequestListForDetailAndUpdate = ({ current }: Props) => {
    const [showDetail, setShowDetail] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)

    const handleCloseDetail = () => {
        setShowDetail(false)
    }

    const handleCloseUpdate = () => {
        setShowUpdate(false)
    }

    return (
        <tr key={current.id}>
            <td>{current.totalDays}</td>
            <td>{moment(current.startDate).format('YYYY-MM-DD')}</td>
            <td>{moment(current.endDate).format('YYYY-MM-DD')}</td>
            <td>{current.description}</td>
            <td>{current.approvalProcessName}</td>
            <td>
                <span
                    className={
                        'sizeList badge badge-light-' +
                        (current.approvalState == 'Onaylandı'
                            ? 'success'
                            : current.approvalState == 'Bekleniyor'
                                ? 'warning'
                                : 'danger')
                    }
                >
                    {current.approvalState}
                </span>
            </td>
            <td>
                <button
                    className='btn btn-icon btn-secondary me-5'
                    onClick={() => setShowDetail(true)}
                >
                    <KTSVG
                        path='/media/icons/duotune/general/gen052.svg'
                        className='svg-icon-3 text-dark'
                    />
                </button>
                {current.approvalState === 'Bekleniyor' && (
                    <button
                        className='btn btn-icon btn-primary m-0'
                        onClick={() => setShowUpdate(true)}
                    >
                        <KTSVG
                            path='/media/icons/duotune/art/art005.svg'
                            className='svg-icon-3  text-white'
                        />
                    </button>
                )}
                <TimeLineToRequestInfoModal
                    state={current.approvalState}
                    id={current.id}
                    show={showDetail}
                    handleClose={handleCloseDetail}
                />
                <UpdateToPermissionInfoModal
                    updatedData={current}
                    show={showUpdate}
                    handleClose={handleCloseUpdate}
                />
            </td>
        </tr>
    )
}

export default LeaveRequestListForDetailAndUpdate;