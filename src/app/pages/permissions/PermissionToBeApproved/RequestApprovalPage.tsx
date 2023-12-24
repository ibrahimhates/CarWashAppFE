import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import '../RequestApprovalPage.css';
import HttpService from "../../../services/HttpService";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../actions/notificationAction";

type Props = {
    id: string;
    show: boolean;
    name: string;
    handleClose: () => void;
    refreshData: () => void;
}
interface IRequestApproval {
    queue: number;
    requestType: string;
    approvalState: string;
    id: string;
    description: string | null;
    isProcessed: boolean;
}

interface IRequestBody {
    description: string | null;
    isApproval: boolean;
}

const RequestApprovalPage = ({ refreshData, id, name, show, handleClose }: Props) => {

    const [requestApproval, setRequestApproval] = useState<IRequestApproval>();
    const [requestBody, setRequestBody] = useState<IRequestBody>();
    const [loading, setLoading] = useState(false);
    const [buttonDanger, setButtonDanger] = useState(false);
    const [buttonSuccess, setButtonSuccess] = useState(false);
    const [descrip, setDescription] = useState('');
    const dispatch = useDispatch();

    function handleButtonListen(isApproval: boolean) {
        setRequestBody({ description: descrip, isApproval: isApproval });
        isApproval ? setButtonSuccess(true) : setButtonDanger(true);
    }

    useEffect(() => {
        if (requestBody !== undefined && requestBody !== null)
            fetchSetApproval();
    }, [requestBody]);

    const fetchSetApproval = () => {
        setLoading(true);
        HttpService.put(`RequestApprovals/setApproval/${requestApproval?.id}`, requestBody, Cookies.get("authToken"))
            .then(() => {
                setLoading(false);
                setButtonDanger(false);
                setButtonSuccess(false);
            })
            .then(() => {
                dispatch(showNotification({
                    type: 'success',
                    message: `Talebi basarili bir sekilde ${requestBody?.isApproval ? 'onayladiniz' : 'reddettiniz'}`
                }))
                handleClose()
                refreshData()
            })
            .catch((e) => {
                console.log(e);
                dispatch(showNotification({
                    type: 'error',
                    message: `Talebi ${requestBody?.isApproval ? 'onaylarken' : 'reddederken'} bir hata olustu`
                }))
                setLoading(false);
                setButtonDanger(false);
                setButtonSuccess(false);
            })
    };

    useEffect(() => {
        HttpService.get(`RequestApprovals/approvalDetailApprover?id=${id}`, Cookies.get("authToken"))
            .then((response) => {
                setRequestApproval(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, []);

    useEffect(() => {
        if (requestApproval?.description !== undefined && requestApproval?.description !== null) {
            setDescription(requestApproval.description);
        } else {
            setDescription('');
        }
    }, [requestApproval])

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
            <form>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>{requestApproval?.requestType} Talebi</h5>
                        <button type='button' className='btn-close' onClick={handleClose}></button>
                    </div>
                    <div className='modal-body p-2'>
                        {requestApproval &&
                            <div className='d-flex align-items-center flex-column rounded mb-2'>
                                <div className='col-md-10 mt-5'>
                                    <div className='mb-5'>
                                        <label className='form-label'>Talep Edenin Adı Soyadı</label>
                                        <input
                                            type='text'
                                            className='form-control form-control-lg form-control-solid'
                                            name='name'
                                            value={name}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className='col-md-10'>
                                    <div className='mb-5'>
                                        <label className='form-label'>Talep Türü</label>
                                        <input
                                            type='text'
                                            className='form-control form-control-lg form-control-solid'
                                            name='requestType'
                                            value={requestApproval.requestType}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className='col-md-10'>
                                    <div className='mb-5'>
                                        <label className='form-label'>Onay Surecindeki Sıranız</label>
                                        <input
                                            type='text'
                                            className='form-control form-control-lg form-control-solid'
                                            name='queue'
                                            value={requestApproval.queue}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className='col-md-10'>
                                    <div className='mb-5'>
                                        <label className='form-label'>Açıklamanız</label>
                                        <input
                                            type='text'
                                            className='form-control form-control-lg form-control-solid'
                                            name='description'
                                            placeholder='Aciklama'
                                            value={descrip}
                                            maxLength={150}
                                            onChange={(e) => { setDescription(e.target.value) }}
                                            readOnly={requestApproval && requestApproval.isProcessed}
                                        />
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <span className={`size badge badge-light-${(requestApproval.approvalState == "Onaylandı" ? "success" :
                                        (requestApproval.approvalState == "Bekleniyor" ? "warning" : "danger"))}`}>{requestApproval.approvalState}</span>
                                </div>
                            </div>
                        }
                    </div>
                    {requestApproval && !requestApproval.isProcessed && <div className='modal-footer'>
                        {(!loading || buttonDanger) && <button disabled={loading} type='button' className='btn btn-danger' onClick={() => handleButtonListen(false)}>
                            {(!loading || !buttonDanger) && <span className='indicator-label'>Reddet</span>}
                            {loading && buttonDanger && (
                                <span className='indicator-progress' style={{ display: 'block' }}>
                                    Lütfen bekleyin...
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            )}
                        </button>}
                        {(!loading || buttonSuccess) && <button disabled={loading} type='button' className='btn btn-success' onClick={() => handleButtonListen(true)}>
                            {(!loading || !buttonSuccess) && <span className='indicator-label'>Onayla</span>}
                            {loading && buttonSuccess && (
                                <span className='indicator-progress' style={{ display: 'block' }}>
                                    Lütfen bekleyin...
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            )}
                        </button>}

                    </div>}
                </div>
            </form>
        </Modal>
    );
}

export default RequestApprovalPage;