import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import HttpService from "../../../../../services/HttpService";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../../../actions/notificationAction";

type Props = {
    show: boolean
    handleClose: () => void
    handleExit: () => void
    salaryId: string
}

interface IAdditionalSalaryDetail {
    additionalSalaryTypeName: string;
    price: number;
    priceUnit: string;
    paymentPeriod: number;
    additionalSalaryTypeId: string;
}

const DetailModal = ({ show, handleClose, handleExit, salaryId }: Props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [addDetail, setAddDetail] = useState<IAdditionalSalaryDetail[]>([])

    useEffect(() => {
        HttpService.get(`Salaries/addtionalDetail/${id}/${salaryId}`, Cookies.get("authToken"))
            .then((res) => {
                setAddDetail(res.data)
            })
            .catch((e) => {
                console.log(e)
                handleClose();
                dispatch(showNotification({
                    type: 'error',
                    message: 'Ek odeme detaylari getirilirken hata ile karsilandi.'
                }))
            })
    })

    return (
        <Modal
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-600px'
            show={show}
            onHide={handleClose}
            onExited={handleExit}
            backdrop={true}
        >
            <div className="modal-body">
                <div className='table-responsive'>
                    <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                        <thead>
                            <tr className='fw-bold text-muted'>
                                <th className='min-w-100px'>Ek Odeme Turu</th>
                                <th className='min-w-100px'>Tutar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addDetail && addDetail.map(item => {
                                return (
                                    <tr>
                                        <td>{item.additionalSalaryTypeName}</td>
                                        <td className='fw-bold'>{
                                            `${item.price} ${item.priceUnit} / ${item.paymentPeriod === 30 ? 'Aylık' : 'Haftalık'}`
                                        }</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </Modal>
    );
}

export default DetailModal;