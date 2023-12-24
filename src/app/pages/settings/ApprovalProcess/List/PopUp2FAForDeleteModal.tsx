import { Modal } from "react-bootstrap";
import HttpService from "../../../../services/HttpService";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../../actions/notificationAction";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    show: boolean;
    handleClose: () => void;
    id?: string;
    refreshData?: () => void;
}

const PopUp2FAForDeleteModal = ({ show, handleClose, id, refreshData }: Props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const FetchDeleteData = () => {
        setLoading(true);
        HttpService.delete(`ApprovalProcesses/delete/${id}`, Cookies.get("authToken"))
            .then(() => {
                setLoading(false);
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
        <Modal
            id='create_employee_modal'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-500px'
            show={show}
            onHide={handleClose}
            backdrop={true}
        >

            <div className='modal-header px-lg-10 '>
                <h2 className="modal-title">Silmek istediginizden emin misiniz?</h2>
            </div >
            <div className='modal-footer d-flex justify-content-end'>
                <div className='d-flex justify-content-center'>
                    <button type='button' className='btn btn-secondary me-3' onClick={handleClose}>
                        Hayir
                    </button>
                    <button type='button' className='btn btn-primary' onClick={FetchDeleteData}>
                        {!loading && <span className='indicator-label'>Evet</span>}
                        {loading && (
                            <span className='indicator-progress' style={{ display: 'block' }}>
                                Lütfen bekleyin...
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </Modal >
    )
}

export default PopUp2FAForDeleteModal;