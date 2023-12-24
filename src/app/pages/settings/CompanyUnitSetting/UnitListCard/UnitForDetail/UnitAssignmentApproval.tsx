import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import { KTSVG } from "../../../../../../_metronic/helpers";
import HttpService from "../../../../../services/HttpService";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../../../actions/notificationAction";
import { customJwtDecode } from "../../../../../CustomJwt";


type Props = {
    show: boolean,
    handleClose: () => void,
    unitId: string,
    unitName: string
}
interface DecodedToken {
    CompanyId?: string;
}
/*
{
  "unitId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "approvalProcessId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "requestTypeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}

*/

interface IUnitApprovalProcess {
    unitId: string;
    approvalProcessId: string;
    requestTypeId: string;
}

interface IApprovalProcess {
    id: string;
    name: string;
}

interface IRequestType {
    id: string;
    name: string;
}

const UnitAssignmentApproval = ({ show, handleClose, unitId, unitName }: Props) => {
    const token: any = Cookies.get("authToken")
    const decodedToken: DecodedToken = customJwtDecode(token);
    const companyId = decodedToken.CompanyId;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const [unitApprovalProc, setUnitApprovalProc] = useState<IUnitApprovalProcess>({
        unitId: unitId,
        approvalProcessId: '',
        requestTypeId: ''
    })
    const [approvalProcesses, setApprovalProcesses] = useState<IApprovalProcess[]>([])
    const [requestTypes, setRequestTypes] = useState<IRequestType[]>([])

    useEffect(() => {
        HttpService.get(`ApprovalProcesses/all/${companyId}`, token)
            .then((response) => {
                setApprovalProcesses(response.data)
            })
            .catch((e) => {
                console.log(e);
            });
    }, [])

    useEffect(() => {
        HttpService.get(`RequestTypes/all/`, token)
            .then((response) => {
                setRequestTypes(response.data)
            })
            .catch((e) => {
                console.log(e);
            });
    }, [])

    const createUnitApprovalProcess = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);
        HttpService.post(`UnitApprovalProcesses/create`, unitApprovalProc, token)
            .then(() => {
                setLoading(false)
            })
            .then(() => {
                handleClose();
                dispatch(showNotification({ type: 'success', message: 'Onay sureci basarili bir sekilde atandi' }))
            })
            .catch((e) => {
                console.log(e);
                setLoading(false)
                dispatch(showNotification({ type: 'error', message: 'Onay sureci atanirken hata ile karşılandı' }))
            });
    }

    const updateApprovalDatas = (fieldsToUpdate: Partial<IUnitApprovalProcess>) => {
        const updatedData = { ...unitApprovalProc, ...fieldsToUpdate };
        setUnitApprovalProc(updatedData);
    };

    return (
        <Modal
            id={`create_unit_modal`}
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-500px'
            show={show}
            onHide={handleClose}
            backdrop={true}
        >
            <div className="modal-header">
                <h6 className="modal-title">{`${unitName} Onay Sureci Ekle`}</h6>
            </div><form onSubmit={createUnitApprovalProcess}>
                <div className="modal-body py-lg-10 px-lg-10">

                    <div className='row g-5'>

                        <div className='col-md-12'>
                            <label className='form-label'>Talep Turu</label>
                            <div className='mb-3'>
                                <select
                                    className='form-control form-select'
                                    data-live-search="true"
                                    onChange={(e) => updateApprovalDatas({ requestTypeId: e.target.value })}
                                >
                                    <option value='' className='text-dark'> Talep Turu Seciniz</option>
                                    {requestTypes.map(req => {
                                        return (
                                            <option value={req.id} className='text-dark'>{req.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label'>Onay Surecleri</label>
                            <div className="mb-3">
                                <select
                                    className='form-control form-select required'
                                    data-live-search="true"
                                    onChange={(e) => updateApprovalDatas({ approvalProcessId: e.target.value })}
                                >
                                    <option value='' className='text-dark'> Onay Sureci Seciniz </option>
                                    {approvalProcesses.map(app => {
                                        return (
                                            <option value={app.id} className='text-dark'>{app.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className='d-flex justify-content-end'>
                        <div className='d-flex justify-content-center'>
                            <button type='button' className='btn btn-secondary me-3' onClick={handleClose}>
                                İptal Et
                            </button>
                            <button type='submit' className='btn btn-primary'>
                                {!loading && <span className='indicator-label'>Oluştur</span>}
                                {loading && (
                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                        Lütfen bekleyin...
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

        </Modal>
    )
}

export default UnitAssignmentApproval;