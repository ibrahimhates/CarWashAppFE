import Cookies from "js-cookie";
import HttpService from "../../../../../services/HttpService";
import Swal, { SweetAlertResult } from "sweetalert2";
import { useParams } from "react-router-dom";

type Props = {
    positionId: string;
    fetchAllPositions: () => void;
    setLoading: (cond: boolean) => void;
    showUpdateHandler:() => void;
}

const Dropdown = ({ showUpdateHandler,positionId, fetchAllPositions, setLoading }: Props) => {
    const {id} = useParams()

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

    const deleteSalary = async () => {
        setLoading(true)
        HttpService.delete(`UserPosition/delete/${positionId}/${id}`, Cookies.get('authToken'))
            .then(async () => {
                setLoading(false)
                Swal.fire('Silindi!', 'Pozisyon basarili bir sekilde silindi.', 'success');
                fetchAllPositions()
            })
            .catch((e) => {
                console.log(e);
                Swal.fire('Hata!', 'Pozisyon silinirken hata olustu.', 'error');
                setLoading(false);
            })
    }

    return (
        <ul className="dropdown-menu p-0">
            <li>
                <button
                    className="btn btn-light-success mw-170px dropdown-item"
                    onClick={showUpdateHandler}
                >
                    Güncelle
                </button>
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

export default Dropdown;