import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import ApprovalAddedModal from "./ApprovalAddedModal";

type Props = {
    FetchProcessRight: () => void;
    companyId:string;
    token:any;
}

const ApprovalAddedButton = ({ FetchProcessRight ,companyId,token }: Props) => {
    const [show, setShow] = useState(false);

    const clickEvent = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }


    return (
        <div className="d-flex align-items-end flex-column mt-5">
            <button className='btn btn-primary fw-bold' onClick={clickEvent}>
                <FaPlus />
                &nbsp;
                Onay Sureci Ekle
            </button>
            <ApprovalAddedModal
                show={show} 
                handleClose={handleClose} 
                FetchProcessRight={FetchProcessRight}
                companyId={companyId}
                token={token}
            />
        </div>
    )
}

export default ApprovalAddedButton;