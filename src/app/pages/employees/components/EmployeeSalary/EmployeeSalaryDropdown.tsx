import { useState } from "react";
import UpdateSalaryModal from "./UpdateSalary/UpdateSalaryModal";
import Swal, { SweetAlertResult } from "sweetalert2";
import HttpService from "../../../../services/HttpService";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import DetailModal from "./AdditionalSalaryDetail/DetailModal";

type Props = {
    salaryId: string;
    fetchAllAmount: () => void;
    setLoading: (cond: boolean) => void;
    addSalaryIsExist: boolean;
}

const EmployeeSalaryDropdown = ({ salaryId, fetchAllAmount, setLoading, addSalaryIsExist }: Props) => {
    const [uptadeShow, setUpdateShow] = useState(false);
    const [detailShow, setDetailShow] = useState(false);
    const [updateIsExited, setUpdateIsExited] = useState(true);
    const [detailIsExited, setDetailIsExited] = useState(true);
    const { id } = useParams()

    const handleDeleteClick = async () => {
        const result: SweetAlertResult = await Swal.fire({
            title: 'Silmek istediginizden emin misiniz',
            text: "Bu islem geri alinamaz!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Evet. Sil',
            confirmButtonColor: '#f1416c',
            cancelButtonText: 'Iptal et!',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            await deleteSalary();
        }
    }

    const noAddSalaryResult = async () => {
        Swal.fire({
            title: "Ek Odemeler",
            text: "Bu maas icin ek odemeler bulunamadi!",
            icon: "warning"
        });
    }

    const handleDetail = () => {
        console.log(addSalaryIsExist)
        if (addSalaryIsExist) {
            setDetailIsExited(false);
            setDetailShow(true);
        } else {
            noAddSalaryResult();
        }
    }

    const deleteSalary = async () => {
        setLoading(true)
        HttpService.delete(`Salaries/delete/${id}/${salaryId}`, Cookies.get('authToken'))
            .then(async () => {
                setLoading(false)
                Swal.fire('Silindi!', 'Maas basarili bir sekilde silindi.', 'success');
                fetchAllAmount()
            })
            .catch((e) => {
                console.log(e)
                setLoading(false);
            })
    }

    return (
        <ul className="dropdown-menu p-0">
            <li>
                <button
                    className="btn btn-light-success mw-170px dropdown-item"
                    onClick={() => {
                        setUpdateIsExited(false);
                        setUpdateShow(true);
                    }}
                >
                    Güncelle
                </button>

                {!updateIsExited &&
                    <UpdateSalaryModal
                        salaryId={salaryId}
                        show={uptadeShow}
                        handleClose={() => setUpdateShow(false)}
                        handleExit={() => setUpdateIsExited(true)}
                        fetchAllAmount={fetchAllAmount}
                    />
                }
            </li>

            <li>
                <button
                    className="btn btn-light-warning mw-170px dropdown-item"
                    onClick={handleDetail}
                >
                    Ek Ödemeleri Detay
                </button>
                {!detailIsExited &&
                    <DetailModal
                        salaryId={salaryId}
                        show={detailShow}
                        handleClose={() => setDetailShow(false)}
                        handleExit={() => setDetailIsExited(true)}
                    />
                }
            </li>

            <li>
                <button
                    className="btn btn-light-danger mw-170px dropdown-item"
                    onClick={handleDeleteClick}
                >
                    Sil
                </button>
            </li>
        </ul>
    )
}

export default EmployeeSalaryDropdown;