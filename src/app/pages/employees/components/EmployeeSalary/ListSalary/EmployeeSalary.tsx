import { useState, useEffect } from 'react';
import CreateSalaryModal from '../CreateSalary/CreateSalaryModal';
import HttpService from '../../../../../services/HttpService';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import SalaryList from './SalaryList';

export interface ISalaryList {
    isActive: boolean;
    id: string;
    userBusinessInfoId: string;
    salaryAmount: number;
    isBrut: boolean;
    paymentUnit: string;
    startedPaymentDate: string;
    paymentPeriod: number;
    additionalSalaries: IAdditionalSalary[];
}

interface IAdditionalSalary {
    salaryId: string;
    id: string;
    additionalSalayType: IAdditionalSalaryType
}

interface IAdditionalSalaryType {
    id: string;
    name: string;
}

const EmployeeSalary = () => {
    const { id } = useParams();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [isExit, setExit] = useState(true);
    const [salaries, setSalaries] = useState<ISalaryList[]>([])

    const fetchAllAmount = () => {
        HttpService.get(`Salaries/allSalaray/${id}`, Cookies.get('authToken'))
            .then((response) => {
                setSalaries(response.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        fetchAllAmount()
    }, [])

    const sortedData = [...salaries].sort((a, b) => {
        const dateA: any = new Date(a.startedPaymentDate);
        const dateB: any = new Date(b.startedPaymentDate);
        return dateB - dateA;
    });
    return (
        <div className='card'>
            <div className='card-header d-flex justify-content-between align-items-center'>
                <h2 className='fw-bold'>Maaş</h2>
                <button
                    className='btn btn-primary'
                    onClick={() => {
                        setExit(false)
                        setShowUpdateModal(true)
                    }}
                >
                    Maaş Ekle
                </button>
            </div>
            <div className='card-body py-3'>
                <div className='table-responsive'>
                    <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                        <thead>
                            <tr className='fw-bold text-muted'>
                                <th className='min-w-50px'>Başlangıç Tarihi</th>
                                <th className='min-w-100px'>Tutar</th>
                                <th className='min-w-150px'>Ek Ödemeler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((salary) =>
                                <SalaryList
                                    salary={salary}
                                    fetchAllAmount={fetchAllAmount}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {!isExit && <CreateSalaryModal
                show={showUpdateModal}
                fetchAllAmount={fetchAllAmount}
                handleClose={() => setShowUpdateModal(false)}
                handleExit={() => setExit(true)}
            />}
        </div>
    );
};

export default EmployeeSalary;
