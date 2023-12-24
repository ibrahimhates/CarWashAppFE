import React, { FC, useState } from 'react';
import { Modal } from 'react-bootstrap';
import HttpService from '../../../../services/HttpService';
import { Company } from '../../CompaniesPage'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { showNotification } from '../../../../actions/notificationAction';

type CompanyUpdateModalProps = {
    show: boolean;
    onClose: () => void;
    onConfirm: (company: CompanyUpdateModel) => void;
    company: CompanyUpdateModel;
    setCompany: (company: CompanyUpdateModel) => void;
    companies: Company[];
    setCompanies: (companies: Company[]) => void;

};

interface CompanyUpdateModel {
    name: string;
    id: any;
    phoneNumber: string;
    email: string;
    logo: string;
    isDeleted: boolean;
}

const CompanyUpdateModal: FC<CompanyUpdateModalProps> = ({ show, onClose, onConfirm,company,setCompany ,companies,setCompanies}) => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onload = function (e: any) {
                const imageData = e.target.result;
                const base64ImageData = imageData.split(',')[1];
                setCompany({ ...company, logo: base64ImageData });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit  = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(company)
        HttpService.put(`Companies/update/${company.id}`, company) 
        .then((res) => {
            console.log('Şirket güncelleme başarılı:', res);
            setCompany(company);
            setCompanies(companies.map((company) => {
                if (company.id === res.data.id) {
                    return res.data;
                }
                return company;
            }));
            dispatch(showNotification(
                {
                  type:"success",
                  message:t(`MESSAGES.SUCCESSES.UPDATE.COMPANY.SCompanyU01`)
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
                    message:t(`MESSAGES.ERRORS.UPDATE.COMPANY.${data.errorCodes}`)
                  }));
              }else if(statusCode == 404){
                dispatch(showNotification(
                  {
                    type:"warning",
                    message:t(`MESSAGES.WARNINGS.UPDATE.COMPANY.${data.errorCodes}`)
                  }));
              }else{
                dispatch(showNotification(
                  {
                    type:"error",
                    message:t(`Sirket güncellenirken hata ile karsilandi. Lutfen daha sonra tekrar deneyin.`)//MESSAGES.WARNINGS.CREATE.COMPANY.${data.errorCodes}
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
            <form onSubmit={handleFormSubmit}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Şirket Bilgilerini Güncelle</h5>
                        <button type='button' className='btn-close' onClick={onClose}></button>
                    </div>
                    <div className='modal-body'>
                        <div className='d-flex align-items-center flex-column rounded p-5 mb-7'>
                            <label className='image-input image-input-outline cursor-pointer'>
                                <div
                                    className='image-input-wrapper w-125px h-125px'
                                    style={{
                                        backgroundColor: '#EBEDF4',
                                        backgroundImage: avatarFile
                                            ? `url(${URL.createObjectURL(avatarFile)})`
                                            : `url(${company.logo ? `data:image/png;base64,${company.logo}` : '/media/avatars/question_black.png'})`,
                                    }}
                                ></div>
                                <input
                                    type='file'
                                    id='logoInput'
                                    name='avatar'
                                    accept='image/*'
                                    onChange={handleAvatarChange}
                                    className='d-none'
                                />
                            </label>

                            <input
                            
                                type='text'
                                className='form-control form-control-lg form-control-solid mt-5'
                                name='companyName'
                                placeholder='Şirket Adı'
                                value={company.name}
                                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                                required
                            />
                            <input
                                type='email'
                                className='form-control form-control-lg form-control-solid mt-5'
                                name='companyEmail'
                                placeholder='Şirket Email'
                                value={company.email}
                                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                                required
                            />

                            <input
                                type='text'
                                className='form-control form-control-lg form-control-solid mt-5'
                                name='companyPhoneNumber'
                                placeholder='Şirket Telefon Numarası'
                                value={company.phoneNumber}
                                onChange={(e) => setCompany({ ...company, phoneNumber: e.target.value })}
                                required
                            />

                            <select
                                className='form-select form-select-lg form-select-solid mt-5'
                                id='statusSelect'
                                value={company.isDeleted ? 'inactive' : 'active'}
                                onChange={(e) => setCompany({ ...company, isDeleted: e.target.value === 'inactive' })}
                                required
                            >
                                <option value='active'>Aktif</option>
                                <option value='inactive'>Pasif</option>
                            </select>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-light' onClick={onClose}>
                            Vazgeç
                        </button>
                        <button type='submit' className='btn btn-primary'>
                            Güncelle
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default CompanyUpdateModal;
