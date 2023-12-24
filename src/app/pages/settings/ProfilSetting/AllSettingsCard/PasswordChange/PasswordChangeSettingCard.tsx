import { useState } from "react";
import { KTSVG } from "../../../../../../_metronic/helpers";
import PasswordChangeModal from "./PasswordChangeModal";

const PasswordChangeSettingCard = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }

    return (
        <div className='col-md-4 col-lg-4 col-xl-4 col-xxl-3 mb-md-5 mb-xl-10'>
            <div className="btn btn-white border border-2 border-secondary card h-md-100 p-3" onClick={() => setShow(true)}>
                <div className='card-body d-flex flex-column p-2'>
                    <div className="d-flex align-items-center justify-content-center gap-4">
                        <span className="icon">
                            <KTSVG path='/media/icons/duotune/general/gen047.svg' className='text-primary svg-icon-1' />
                        </span>
                        <div className="d-flex bg-dark" style={{ height: '30px', width: '2px' }}>
                            <div className="vr" />
                        </div>
                        <div className="d-flex">
                            <span className="fw-bold text-gray-700 fs-3">Şifre Değişikliği</span>
                        </div>
                    </div>
                </div>
            </div>
            <PasswordChangeModal show={show} handleClose={handleClose} />
        </div>
    )
}

export default PasswordChangeSettingCard;