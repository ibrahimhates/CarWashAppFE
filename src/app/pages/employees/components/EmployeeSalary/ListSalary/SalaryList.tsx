import moment from 'moment';
import 'moment/locale/tr';
import { ISalaryList } from "./EmployeeSalary";
import { KTSVG } from '../../../../../../_metronic/helpers';
import EmployeeSalaryDropdown from '../EmployeeSalaryDropdown';
import { useState } from 'react';

type Props = {
    salary: ISalaryList;
    fetchAllAmount: () => void;
}

const SalaryList = ({ salary, fetchAllAmount }: Props) => {
    const [loading, setLoading] = useState(false);
    return <tr key={salary.id}>
        <td>{moment(salary.startedPaymentDate).locale("tr").format("D MMMM YYYY")}
            {salary.isActive && <span className='badge badge-light-primary' style={{ marginLeft: '10px' }}>
                Aktif
            </span>}
        </td>
        <td className='fw-bold'>{
            `${salary.salaryAmount} ${salary.paymentUnit} / ${salary.paymentPeriod === 30 ? 'Aylık' : salary.paymentPeriod === 7 ? 'Haftalık' : 'Günlük'}`
        }
            <span className='badge badge-light-success' style={{ marginLeft: '10px' }}>
                {salary.isBrut ? `Brüt` : `Net`}
            </span>
        </td>
        <td>
            <span>
                {salary.additionalSalaries.length > 0 ? salary.additionalSalaries.map((addSalary, index) => {
                    const len = salary.additionalSalaries.length
                    const name = addSalary.additionalSalayType.name
                    if (index != len - 1) {
                        return (
                            name + ', '
                        )
                    }
                    return name
                }) : `-`}
            </span>
        </td>
        <td>
            <div className='dropdown dropstart'>
                <button disabled={loading} type="button" className="btn btn-outline-light btn-active-secondary btn-icon dropdown-toggle" data-bs-toggle="dropdown">
                    {!loading && (
                        <KTSVG
                            path='/media/icons/duotune/general/gen052.svg'
                            className='svg-icon-4 text-dark'
                        />
                    )}
                    {loading && (
                        <span className='indicator-progress text-primary' style={{ display: 'block' }}>
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                    )}
                </button>
                <EmployeeSalaryDropdown
                    salaryId={salary.id}
                    fetchAllAmount={fetchAllAmount}
                    setLoading={setLoading}
                    addSalaryIsExist={salary.additionalSalaries.length > 0}
                />
            </div>
        </td>
    </tr>

}

export default SalaryList;