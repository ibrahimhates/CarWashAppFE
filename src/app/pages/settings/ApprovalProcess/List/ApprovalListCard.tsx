import { useState } from "react";
import { KTSVG } from "../../../../../_metronic/helpers"
import PopUp2FAForDeleteModal from "./PopUp2FAForDeleteModal";
import { IUserQueue } from "../../SettingRoute";
import Swal, { SweetAlertResult } from "sweetalert2";
import HttpService from "../../../../services/HttpService";
import Cookies from "js-cookie";
import { showNotification } from "../../../../actions/notificationAction";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

type Props = {
    userQueues: IUserQueue[];
    approvalName: string;
    isDefault: boolean;
    id?: string;
    refreshData?: () => void;
    role?: string;
}

const ApprvovalListCard = ({ id, userQueues, approvalName, isDefault, refreshData, role }: Props) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const clickEvent = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleDeleteClick = async () => {
        const result: SweetAlertResult = await Swal.fire({
            title: 'Silmek istediginizden emin misiniz',
            text: "Bu islem geri alinamaz!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Evet. Sil',
            confirmButtonColor: '#f1416c',
            cancelButtonText: 'Iptal et!',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            await deleteApprovalProcess();
        }
    }
    const deleteApprovalProcess = async () => {
        setLoading(true)
        HttpService.delete(`ApprovalProcesses/delete/${id}`, Cookies.get("authToken"))
            .then(() => {
                refreshData !== undefined && refreshData();
                handleClose();
                dispatch(showNotification({
                    type: 'success',
                    message: t(`MESSAGES.SUCCESSES.DELETE.APPROVALPROCESS.SApprovalD01`)
                }))
            })
            .catch((e) => {
                setLoading(false)
                handleClose();
                console.log(e);
                const code = e.response.data.statusCode;
                if (code === 400) {
                    dispatch(showNotification({
                        type: 'error',
                        message: t(`MESSAGES.ERRORS.DELETE.APPROVALPROCESS.${e.response.data.errorCode}`)
                    }))
                } else if (code === 404) {
                    dispatch(showNotification({
                        type: 'warning',
                        message: t(`MESSAGES.WARNINGS.DELETE.APPROVALPROCESS.${e.response.data.errorCode}`)
                    }))
                } else {
                    dispatch(showNotification({
                        type: 'error',
                        message: "Silme isleminde hata olustu" //t(`MESSAGES.WARNINGS.DELETE.APPROVALPROCESS.${e.response.data.errorCode}`)
                    }))
                }
            })
    }

    return (
        <div className='card border border-secondary border-3 mt-5'>
            <div className='card-header form-control'>
                <h5 className='card-title '>
                    {approvalName === 'Default' ? 'Varsayilan Onay Sureci' : approvalName}
                </h5>
                {!isDefault && role === 'HesapSahibi' &&
                    <>
                        <button
                            type='button'
                            className={`card-title text-white btn btn-icon btn-${loading ? 'white' : 'danger'}`}
                            onClick={handleDeleteClick}
                        >
                            {!loading && <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-2' />}
                            {loading && (
                                <span className='indicator-progress text-primary' style={{ display: 'block' }}>
                                    <span className='spinner-border spinner-border-sm align-middle'></span>
                                </span>
                            )}
                        </button>
                        {/* <PopUp2FAForDeleteModal
                            show={show}
                            handleClose={handleClose}
                            id={id}
                            refreshData={refreshData}
                        /> */}
                    </>
                }
            </div>
            <div className="card-body form-control">
                <div className="input-section d-inline-flex align-items-center">
                    <div className="input-group">
                        <KTSVG path='/media/svg/avatars/001-boy.svg' className='input-group-text svg-icon-2 border border-secondary' />
                        <input
                            type="text"
                            value="Calisan"
                            className="form-control form-control-lg form-control-solid text-dark fw-bold ml-1 "
                            readOnly
                        />
                    </div>
                    <i className="fa fa-arrow-right mx-3"></i>
                    {userQueues.map(userQueue => (
                        Array.from({ length: userQueues.length }).map((_, index) => {
                            if (userQueue.queue === index + 1) {
                                return (
                                    <>
                                        <div className="input-group">
                                            <KTSVG path='/media/svg/avatars/001-boy.svg' className='input-group-text svg-icon-2 border border-secondary' />
                                            <input
                                                type="text"
                                                value={userQueue.fullName}
                                                className="form-control form-control-lg form-control-solid text-dark fw-bold ml-1"
                                                readOnly
                                            />
                                        </div>
                                        <i className="fa fa-arrow-right mx-3"></i>
                                    </>
                                )
                            }
                            return null;
                        })
                    ))}
                    <div className="input-group ">
                        <KTSVG path='/media/icons/duotune/arrows/checkmark-outline.svg' className='input-group-text svg-icon-2 bg-success border border-secondary' />
                        <input
                            type="text"
                            value="Onaylandi"
                            className="form-control form-control-lg form-control-solid text-dark fw-bold ml-1"
                            readOnly
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ApprvovalListCard;