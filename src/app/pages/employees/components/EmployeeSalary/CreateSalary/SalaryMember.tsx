import { useEffect, useState } from "react";
import moment from "moment";
import AdditionalSalaryMembers from "./AdditionalSalaryMembers";
import { IAdditionalSalary, ISalaryCreate } from "./CreateSalaryModal";
import HttpService from "../../../../../services/HttpService";
import Cookies from "js-cookie";

type Props = {
    salary: ISalaryCreate;
    updateData: (field: Partial<ISalaryCreate>) => void;
    currentDate: string;
}

export interface IAdditionalSalaryType {
    id: string,
    name: string
}


const SalaryMember = ({ salary, updateData, currentDate }: Props) => {
    const [salaryTypes, setSalaryTypes] = useState<IAdditionalSalaryType[]>([])
    const [addSalaries, setAddSalaries] = useState<IAdditionalSalary[]>([]);

    useEffect(() => {
        HttpService.get(`Salaries/allSalaryType`, Cookies.get('authToken'))
            .then((response) => {
                setSalaryTypes(response.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])

    const addAmount = (id: string) => {
        const updated: IAdditionalSalary[] = [...addSalaries,
        {
            additionalSalaryTypeId: id,
            paymentPeriod: 30,
            price: 0.01,
            priceUnit: 'TL'
        }];
        setAddSalaries(updated);
        updateData({ additionalSalaries: updated });
        const select: any = document.querySelector('select[name="additionalSalary"]')
        select.value = ''
    }

    const updateAmount = (id: string, field: Partial<IAdditionalSalary>) => {
        const updated: IAdditionalSalary[] = [...addSalaries]

        const index = addSalaries
            .findIndex(item => item.additionalSalaryTypeId === id)

        if (index !== -1) {
            updated[index] = { ...updated[index], ...field }
            setAddSalaries(updated);
            updateData({ additionalSalaries: updated });
        }
    }

    const removeAmount = (id: string) => {
        const updated: IAdditionalSalary[] = addSalaries.filter(addS => addS.additionalSalaryTypeId !== id)
        setAddSalaries(updated);
        updateData({ additionalSalaries: updated });
    }

    return (
        <form>
            <div className='row g-5'>
                <div className='col-md-4'>
                    <div className='mb-5'>
                        <label className='form-label'>Maaş</label>
                        <input
                            type='number'
                            step='0.01'
                            min='0.00'
                            className='form-control'
                            name='miktar'
                            value={salary.salaryAmount}
                            onChange={(e) => updateData({ salaryAmount: parseFloat(e.target.value) })}
                        />
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='mb-5'>
                        <label className='form-label'>Birimi</label>
                        <select
                            className='form-select'
                            name='unitForSalary'
                            onChange={(e) => updateData({ paymentUnit: e.target.value })}
                        >
                            <option value='TL'>TL</option>
                            <option value="Dolar">Dolar</option>
                        </select>
                    </div>
                </div>

                <div className='col-md-4 d-flex justify-content-start mt-7'>
                    <div className='form-switch form-switch-sm form-check-custom'>
                        <input
                            className='form-check-input w-50px h-30px'
                            type='checkbox'
                            name='brut'
                            checked={salary.isBrut}
                            onChange={(e) => updateData({ isBrut: e.target.checked })}
                        />
                        <label className='form-check-label'>{salary.isBrut ? `Brüt` : `Net`}</label>
                    </div>
                </div>

                <div className='col-md-6'>
                    <div className='mb-5'>
                        <label className='form-label'>Başlangıç Tarihi</label>
                        <input
                            type='date'
                            className='form-control'
                            name='gecerlilik'
                            min={currentDate}
                            value={moment(salary.startedPaymentDate).format('YYYY-MM-DD')}
                            onChange={(e) => updateData({ startedPaymentDate: e.target.value })}
                        />
                    </div>
                </div>

                <div className='col-md-6'>
                    <div className='mb-5'>
                        <label className='form-label'>Maaş Periyodu</label>
                        <select
                            className='form-select'
                            name='periyot'
                            disabled={false}
                            onChange={(e) => updateData({ paymentPeriod: parseInt(e.target.value) })}
                        >
                            <option value={30}>Aylık</option>
                            <option value={7}>Haftalık</option>
                            <option value={1}>Günlük</option>
                        </select>
                    </div>
                </div>



                <div className='col-md-12'>
                    <div className='col-md-4 mb-5'>
                        <select
                            className='form-select'
                            name='additionalSalary'
                            onChange={(e) => addAmount(e.target.value)}
                        >
                            <option value='' selected >Odeme Ekle</option>
                            {salaryTypes.map((salaryType) => {
                                return (
                                    <option key={salaryType.id} value={salaryType.id}>
                                        {salaryType.name}
                                    </option>
                                )
                            })
                            }
                        </select>
                    </div>
                </div>
                {
                    Object.values(addSalaries).map(item => {
                        const name = salaryTypes.find(x => x.id == item.additionalSalaryTypeId)?.name
                        return (
                            <AdditionalSalaryMembers
                                addSalary={item}
                                removeThis={removeAmount}
                                salaryTypeName={name!}
                                updateAmount={updateAmount}
                            />
                        )
                    })
                }
            </div>
        </form>
    )
}

export default SalaryMember;