import React, { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { KTSVG } from '../../../../../_metronic/helpers';
import HttpService from '../../../../services/HttpService';
import { Company } from '../../CompaniesPage';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { showNotification } from '../../../../actions/notificationAction';

type CompanySoftDeleteModalProps = {
    show: boolean;
    onClose: () => void;
    onConfirm: (companyId: string) => void;
    companyId: string;
    companies: Company[];
    setCompanies: (companies: Company[]) => void;
    company: Company;
    setCompany: (company: Company) => void;
};

const CompanySoftDeleteModal: FC<CompanySoftDeleteModalProps> = ({ show, onClose, onConfirm, companyId,companies,setCompanies ,company,setCompany}) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();


    const handleConfirmClick = () => {
        HttpService.put(`Companies/deletesoft/${companyId}`)
            .then((res) => {
                console.log('Şirketi pasif yapma başarılı:', res);
                setCompany(company);
                setCompanies(companies.map((company) => {
                    if (company.id === res.data.id) {
                        return res.data;
                    }
                    return company;
                }
                ));
            })
            .then(() => {
                dispatch(showNotification(
                    {
                      type:"success",
                      message:t(`MESSAGES.SUCCESSES.DELETE.COMPANY.SCompanyD01`)
                    }));

                onClose();
            })
            .catch((err) => {
                const data = err.response.data;
                const statusCode = data.statusCode;

                if(statusCode == 400){
                    dispatch(showNotification(
                      {
                        type:"error",
                        message:t(`MESSAGES.ERRORS.DELETE.COMPANY.${data.errorCodes}`)
                      }));
                  }else if(statusCode == 404){
                    dispatch(showNotification(
                      {
                        type:"warning",
                        message:t(`MESSAGES.WARNINGS.DELETE.COMPANY.${data.errorCodes}`)
                      }));
                  }else{
                    dispatch(showNotification(
                      {
                        type:"error",
                        message:t(`Sirket pasife alınırken hata ile karsilandi. Lutfen daha sonra tekrar deneyin.`)//MESSAGES.WARNINGS.CREATE.COMPANY.${data.errorCodes}
                      }));
                  }
            });
    };

    return (
        <Modal
            id='kt_modal_soft_delete_company'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered'
            show={show}
            onHide={onClose}
            backdrop='static'
            keyboard={false}
        >
            <div className='modal-content'>
                <div className='modal-header'>
                    <h5 className='modal-title'>Şirketi Pasif Yap</h5>
                    <button type='button' className='btn-close' onClick={onClose}></button>
                </div>
                <div className='modal-body'>
                    <div className='d-flex align-items-center bg-light-warning rounded p-5 mb-7'>
                        <span className='svg-icon svg-icon-warning me-5'>
                            <KTSVG path='/media/icons/duotune/general/gen040.svg' className='svg-icon-1' />
                        </span>
                        <div className='flex-grow-1 me-2'>
                            <span className='fw-bold text-warning fs-6'>
                                Emin misiniz? Bu işlem geri alınamaz.
                            </span>
                        </div>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' onClick={onClose}>
                        İptal
                    </button>
                    <button type='button' className='btn btn-warning' onClick={handleConfirmClick}>
                        Pasif Yap
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CompanySoftDeleteModal;
