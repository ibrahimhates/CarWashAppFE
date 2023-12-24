import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import HttpService from '../../../../../services/HttpService';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../../../actions/notificationAction';
import AdditionalSalaryMembers from './AdditionalSalaryMembers';
import SalaryMember from './SalaryMember';

type Props = {
    show: boolean;
    handleClose: () => void;
    handleExit: () => void;
    fetchAllAmount: () => void
}

export interface ISalaryCreate {
    salaryAmount: number,
    isBrut: boolean,
    paymentUnit: string,
    startedPaymentDate: string,
    paymentPeriod: number,
    additionalSalaries: IAdditionalSalary[]
}

export interface IAdditionalSalary {
    price: number,
    priceUnit: string,
    paymentPeriod: number,
    additionalSalaryTypeId: string
}

const modalsRoot = document.getElementById('root-modals') || document.body;
const CreateSalaryModal = ({ show, handleClose, handleExit, fetchAllAmount }: Props) => {
    const token = Cookies.get('authToken');
    const { id } = useParams();

    const currentDate = new Date().toISOString().split('T')[0];
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [salary, setSalary] = useState<ISalaryCreate>({
        salaryAmount: 0.01, // decimal
        isBrut: true,
        paymentUnit: 'TL',
        startedPaymentDate: currentDate,
        paymentPeriod: 30,
        additionalSalaries: []
    })


    const fetchCreate = () => {
        setLoading(true);
        HttpService.post(`Salaries/create/${id}`, salary, token)
            .then(() => {
                dispatch(showNotification({
                    type: 'success',
                    message: 'Maas basarili bir sekilde eklendi'
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

    const updateData = (field: Partial<ISalaryCreate>) => {
        const updated = { ...salary, ...field }
        setSalary(updated);
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
                <h2>Maaş Ekle</h2>
            </div>

            <div className='modal-body py-lg-10 px-lg-10 overflow-auto mh-500px'>
                <SalaryMember
                    salary={salary}
                    currentDate={currentDate}
                    updateData={updateData}
                />
            </div>
            <div className='modal-footer'>
                <div className='d-flex justify-content-end'>
                    <button type='button' className='btn btn-secondary me-3' onClick={handleClose}>
                        İptal Et
                    </button>
                    <button type='button' className='btn btn-primary' onClick={fetchCreate}>
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
};

export default CreateSalaryModal;
