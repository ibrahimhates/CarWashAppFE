import React, { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { KTSVG } from '../../../../../_metronic/helpers';
import HttpService from '../../../../services/HttpService';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { showNotification } from '../../../../actions/notificationAction';

type CompanyDeleteModalProps = {
    show: boolean;
    onClose: () => void;
    onConfirm: (companyId: string) => void; // companyId parametresi eklendi
    companyId: string;
};

const CompanyDeleteModal: FC<CompanyDeleteModalProps> = ({ show, onClose, onConfirm, companyId }) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    
    const handleConfirmClick = () => {
        HttpService.delete(`Companies/deletehard/${companyId}`)
            .then((res) => {
                console.log('Şirket silme başarılı:', res);
                onConfirm(companyId);
                dispatch(showNotification(
                    {
                      type:"success",
                      message:t(`MESSAGES.SUCCESSES.DELETE.COMPANY.SCompanyD02`)
                    }));
                window.location.reload();
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
                        message:t(`Sirket silinirken hata ile karsilandi. Lutfen daha sonra tekrar deneyin.`)//MESSAGES.WARNINGS.CREATE.COMPANY.${data.errorCodes}
                      }));
                  }
            });

    };

    return (
        <Modal
            id='kt_modal_delete_company'
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
                    <h5 className='modal-title'>Şirketi Sil</h5>
                    <button type='button' className='btn-close' onClick={onClose}></button>
                </div>
                <div className='modal-body'>
                    <div className='d-flex align-items-center bg-light-danger rounded p-5 mb-7'>
                        {/* begin::Icon */}
                        <span className='svg-icon svg-icon-warning me-5'>
                            <KTSVG path='/media/icons/duotune/general/gen040.svg' className='svg-icon-1' />
                        </span>
                        {/* end::Icon */}
                        {/* begin::Title */}
                        <div className='flex-grow-1 me-2'>
                            <span className='fw-bold text-danger text-danger fs-6'>
                                Emin misiniz? Bu işlem geri alınamaz.
                            </span>
                        </div>
                        {/* end::Title */}
                    </div>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' onClick={onClose}>
                        İptal
                    </button>
                    <button type='button' className='btn btn-danger' onClick={handleConfirmClick}>
                        Sil
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CompanyDeleteModal;
