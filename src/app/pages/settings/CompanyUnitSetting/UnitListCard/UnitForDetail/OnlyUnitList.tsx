import { useState } from "react";
import { KTSVG } from "../../../../../../_metronic/helpers";
import UnitAssignmentApproval from "./UnitAssignmentApproval";
import { Unit } from "../../../SettingRoute";


type Props = {
    unit: Unit
    role:string
}

const OnlyUnitList = ({ unit ,role}: Props) => {
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false);
    }

    return (
        <tr key={unit.id}>
            <td className="text-dark fw-bolder">{unit.name}</td>
            <td>
                {role==='HesapSahibi'&&
                <button
                    className='btn  btn-light-primary btn-sm me-1'
                    onClick={() => setShow(true)}
                >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    Düzenle
                </button>}
                <UnitAssignmentApproval
                    show={show}
                    handleClose={handleClose}
                    unitId={unit.id}
                    unitName={unit.name}
                />
            </td>
        </tr>
    )
}

export default OnlyUnitList;