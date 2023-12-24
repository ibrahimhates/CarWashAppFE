import { useEffect, useLayoutEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { createPortal } from "react-dom";
import HttpService from "../../../../../services/HttpService";
import { useParams } from "react-router-dom";
import SalaryMember from "./SalaryMember";
import { showNotification } from "../../../../../actions/notificationAction";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

type Props = {
    show: boolean;
    handleClose: () => void;
    handleExit: () => void;
    salaryId: string;
    fetchAllAmount: () => void;
}


export interface ISalaryUpdate {
    id: string,
    userBusinessInfoId: string,
    salaryAmount: number,
    isBrut: boolean,
    paymentUnit: string,
    startedPaymentDate: string,
    paymentPeriod: number,
    additionalSalaries: IAdditionalSalaryUpdate[]
}

export interface IAdditionalSalaryUpdate {
    id: string;
    salaryId: string,
    additionalSalaryTypeId: string,
    price: number,
    priceUnit: string,
    paymentPeriod: number
}

const modalsRoot = document.getElementById('root-modals') || document.body;
const UpdateSalaryModal = ({ show, handleClose, handleExit, salaryId, fetchAllAmount }: Props) => {
    const [loading, setLoading] = useState(false);
    const [salaryUpdate, setSalaryUpdate] = useState<ISalaryUpdate | null>(null)
    const { id } = useParams();
    const currentDate = new Date().toISOString().split('T')[0];
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        HttpService.get(`Salaries/salaryForUpdate/${id}/${salaryId}`, Cookies.get("authToken"))
            .then((res) => {
                setSalaryUpdate(res.data);
                console.log(salaryUpdate)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    const fetchUpdate = () => {
        setLoading(true);
        HttpService.put(`Salaries/update/${id}/${salaryUpdate?.id}`, salaryUpdate, Cookies.get('authToken'))
            .then(() => {
                dispatch(showNotification({
                    type: 'success',
                    message: 'Maas basarili bir sekilde guncellendi'
                }));
                setLoading(false);
                fetchAllAmount()
                handleClose()
            })
            .catch((e) => {
                console.log(e);
                dispatch(showNotification({
                    type: 'error',
                    message: 'Maas eklenirken hata ile karsilandi'
                }));
                setLoading(false)
            });
    }

    const updateData = (field: Partial<ISalaryUpdate>) => {
        if (salaryUpdate) {
            const updated = { ...salaryUpdate, ...field }
            setSalaryUpdate(updated);
        }
    }

    return createPortal(
        <Modal
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-600px'
            show={show}
            onHide={handleClose}
            onExited={handleExit}
            backdrop={true}
        >
            <div className='modal-header'>
                <h2>Maaş Guncelle</h2>
            </div>

            <div className='modal-body py-lg-10 px-lg-10 overflow-auto mh-500px'>
                {salaryUpdate && <SalaryMember
                    salary={salaryUpdate!}
                    currentDate={currentDate}
                    updateData={updateData}
                />}
            </div>
            <div className='modal-footer'>
                <div className='d-flex justify-content-end'>
                    <button type='button' className='btn btn-secondary me-3' onClick={handleClose}>
                        İptal Et
                    </button>
                    <button disabled={salaryUpdate === null} type='button' className='btn btn-primary' onClick={fetchUpdate}>
                        {!loading && (
                            <span className='indicator-label'>
                                Kaydet
                            </span>
                        )}
                        {loading && (
                            <span className='indicator-progress' style={{ display: 'block' }}>
                                Lütfen bekleyin...
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </Modal>,
        modalsRoot
    );
}

export default UpdateSalaryModal;