import { KTSVG } from "../../../../../../_metronic/helpers";
import { IAdditionalSalary } from "./CreateSalaryModal";
import { IAdditionalSalaryType } from "./SalaryMember";

type Props = {
    addSalary: IAdditionalSalary;
    removeThis: (id: string) => void;
    salaryTypeName: string;
    updateAmount: (id: string, field: Partial<IAdditionalSalary>) => void
}

const AdditionalSalaryMembers = ({ addSalary, removeThis, salaryTypeName, updateAmount }: Props) => {
    return (
        <div className="row g-5 col-md-12 border border-2">
            <label className='fw-bold form-label mb-0'>
                <a role="button" onClick={() => removeThis(addSalary.additionalSalaryTypeId)}>
                    <KTSVG
                        path='/media/icons/duotune/arrows/arr011.svg'
                        className='svg-icon-2 text-danger'
                    />
                </a>
                {salaryTypeName}
            </label>
            <div className='col-md-4'>
                <div className=''>
                    <label className='form-label'>Ücret</label>
                    <input
                        type='number'
                        step='0.01'
                        min='0.00'
                        className='form-control'
                        name="miktar"
                        value={addSalary.price}
                        onChange={(e) => updateAmount(addSalary.additionalSalaryTypeId, { price: parseFloat(e.target.value) })}
                    />
                </div>
            </div>

            <div className='col-md-4'>
                <div className=''>
                    <label className='form-label'>Birimi</label>
                    <select
                        className='form-select'
                        name='unitForPrice'
                        onChange={(e) => updateAmount(addSalary.additionalSalaryTypeId, { priceUnit: e.target.value })}
                    >
                        <option value='TL'>TL</option>
                        <option value="Dolar">Dolar</option>
                    </select>
                </div>
            </div>

            <div className='col-md-4 d-flex justify-content-start mt-12'>
                <div className='form-switch form-switch-sm form-check-custom'>
                    <input
                        className='form-check-input w-50px h-30px'
                        type='checkbox'
                        checked
                        disabled
                        name='brut'
                    />
                    <label className='form-check-label'>Brüt</label>
                </div>
            </div>

            <div className='col-md-6'>
                <div className='mb-5'>
                    <label className='form-label'>Aciklama</label>
                    <input
                        type='text'
                        disabled
                        className='form-control'
                        name='aciklama'
                    />
                </div>
            </div>

            <div className='col-md-6'>
                <div className='mb-5'>
                    <label className='form-label'>Periyot</label>
                    <select
                        className='form-select'
                        name='periyot'
                        defaultValue={30}
                        onChange={(e) => updateAmount(addSalary.additionalSalaryTypeId, { paymentPeriod: parseInt(e.target.value) })}
                    >
                        <option value={30}>Aylık</option>
                        <option value={7}>Haftalık</option>
                        <option value={1}>Günlük</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default AdditionalSalaryMembers;