/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { KTSVG } from '../../../../../_metronic/helpers'
import { useState } from 'react'
import CompanyDeletModal from '../CompanyDeleteModal/CompanyDeleteModal'
import CompanySoftDeleteModal from '../CompanySoftDeleteModal/CompanySoftDeleteModal'
import './CompanyCard.css'
import CompanyUpdateModal from '../CompanyUpdateModal/CompanyUpdateModal'
import { Company } from '../../CompaniesPage'

type Props = {
    name: string;
    phoneNumber: string;
    email: string;
    logo: string;
    color?: string;
    id: any;
    isDeleted: boolean;
    companies: Company[];
    setCompanies: (companies: Company[]) => void;
}

const CompanyCard: FC<Props> = ({
    name,
    phoneNumber,
    email,
    logo,
    id,
    isDeleted,
    color = 'danger',
    companies,
    setCompanies
}) => {

    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState(null);

    const [isPassiveModalVisible, setPassiveModalVisible] = useState(false);
    const [companyToPassive, setCompanyToPassive] = useState(null);

    const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
    const [companyToUpdate, setCompanyToUpdate] = useState(null);


    const [company, setCompany] = useState<Company>({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        logo: logo,
        id: id,
        isDeleted: isDeleted
    })


    const openPassiveModal = (companyId: any) => {
        setCompanyToPassive(companyId);
        setPassiveModalVisible(true);
    };

    const closePassiveModal = () => {
        setPassiveModalVisible(false);
        setCompanyToPassive(null);
    };


    const openDeleteModal = (companyId: any) => {
        setCompanyToDelete(companyId);
        setDeleteModalVisible(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalVisible(false);
        setCompanyToDelete(null);
    };

    const handleDeleteCompany = () => {
        if (companyToDelete) {
            closeDeleteModal();
        }
    };



    const openUpdateModal = (companyId: any) => {
        setCompanyToUpdate(companyId);
        setUpdateModalVisible(true);
    };

    const closeUpdateModal = () => {
        setUpdateModalVisible(false);
        setCompanyToUpdate(null);
    };


    return (
        <div className={`card ${isDeleted ? 'bg-light-gray' : ''}`}>
            <div className='card-body d-flex flex-center flex-column p-9'>
                <div className='mb-5'>
                    <div className='symbol symbol-75px symbol-circle'>
                        {logo ? (
                            <img
                                alt={`${name} Logo`}
                                src={`data:image/png+svg+xml;base64,${logo}`}
                                className={`symbol-label bg-light-${color} text-${color} fs-5 fw-bolder`}
                            />
                        ) : (
                            <img alt='Pic' src={toAbsoluteUrl('/media/avatars/question_black.png')} />

                        )}
                        {isDeleted ? (
                            <div className='symbol-badge bg-danger start-100 top-100 border-4 h-15px w-15px ms-n3 mt-n3'></div>
                        ) : <div className='symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n3 mt-n3'></div>
                        }


                    </div>
                </div>

                <a href='#' className='fs-4 text-gray-800 text-hover-primary fw-bolder mb-0'>
                    {name}
                </a>
                <div className='fw-bold text-gray-400 mb-6'>{email}</div>
                <div className='d-flex justify-content-center align-items-center flex-wrap mb-5'>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mx-3 mb-3 text-center mx-auto'>
                        <div className='fs-6 fw-bolder text-gray-700'>{phoneNumber}</div>
                    </div>
                </div>

                <div className='d-flex justify-content-between w-100'>

                    <button className='btn btn-sm btn-light-warning fw-bolder ms-5' onClick={() => openPassiveModal(id)}>
                        <KTSVG path={"/media/icons/duotune/arrows/arr082.svg"} className='svg-icon-2' />
                        Şirketi Pasif Yap
                    </button>
                    <CompanySoftDeleteModal show={isPassiveModalVisible} onClose={closePassiveModal} onConfirm={handleDeleteCompany} companyId={id} companies={companies} company={company} setCompanies={setCompanies} setCompany={setCompany} />



                    <button className='btn btn-sm btn-light-primary fw-bolder me-5' onClick={() => openUpdateModal(id)}>
                        <KTSVG path={"/media/icons/duotune/coding/cod001.svg"} className='svg-icon-2' />
                        Şirketi Düzenle
                    </button>
                    <CompanyUpdateModal show={isUpdateModalVisible} onClose={closeUpdateModal} onConfirm={handleDeleteCompany} company={company} setCompany={setCompany} companies={companies} setCompanies={setCompanies} />


                    {/* <button className='btn btn-sm btn-light-danger fw-bolder' onClick={() => openDeleteModal(id)}>
                        <KTSVG path={"/media/icons/duotune/general/gen027.svg"} className='svg-icon-2' />
                        Şirketi Sil
                    </button>
                    <CompanyDeletModal show={isDeleteModalVisible} onClose={closeDeleteModal} onConfirm={handleDeleteCompany} companyId={id} /> */}

                </div>

            </div>
        </div>
    )
}

export { CompanyCard }
