import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import HttpService from "../../../../services/HttpService";
import { KTSVG } from "../../../../../_metronic/helpers";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../../actions/notificationAction";
import { useTranslation } from "react-i18next";

type Props = {
    show: boolean;
    handleClose: () => void;
    FetchProcessRight: () => void;
    token: any;
    companyId: string;
}

interface IApprovalProcess {
    name: string;
    companyId: string;
    userQueues: IUserQueue[];
}

interface IUserQueue {
    queue: number;
    userId: string;
}

interface IUser {
    fullName: string;
    id: string;
}

const ApprovalAddedModal = ({ show, handleClose, FetchProcessRight, companyId, token }: Props) => {

    const { t } = useTranslation();

    const [approvalProcess, setApprovalProcess] = useState<IApprovalProcess>({
        name: '',
        companyId: companyId || '',
        userQueues: []
    })
    const [userQueues, setUserQueues] = useState<IUserQueue[]>([{ userId: '', queue: 1 }]);
    const updateApprovalProcessData = (fieldsToUpdate: Partial<IApprovalProcess>) => {
        const updatedData = { ...approvalProcess, ...fieldsToUpdate };
        setApprovalProcess(updatedData);
    };

    const [users, setUsers] = useState<IUser[]>()
    const [spawn, setSpawn] = useState(1);
    const [valid, setValid] = useState(false);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    const createApprovalProcess = () => {
        const userInValid = userQueues.some(item => item.userId === '');
        if (!userInValid) {
            setLoading(true)
            HttpService.post('ApprovalProcesses/create', approvalProcess, token)
                .then(() => {
                    setLoading(false)
                    dispatch(showNotification({
                        type: 'success',
                        message: t(`MESSAGES.SUCCESSES.CREATE.APPROVALPROCESS.SApprovalC01`)
                    }))
                    clearAllData();
                    FetchProcessRight();
                })
                .catch((e) => {
                    const code = e.response.data.statusCode
                    console.log(e);
                    setLoading(false)
                    if (code === 404) {
                        dispatch(showNotification({
                            type: 'warning',
                            message: t(`MESSAGES.WARNING.CREATE.APPROVALPROCESS.${e.response.data.errorCode}`)
                        }))
                    } else if (code === 400) {
                        dispatch(showNotification({
                            type: 'error',
                            message: t(`MESSAGES.ERRORS.CREATE.APPROVALPROCESS.${e.response.data.errorCode}`)
                        }))
                    } else {
                        dispatch(showNotification({
                            type: 'error',
                            message: "onay sureci olusturulurken hata olustu" //t(`MESSAGES.WARNING.CREATE.APPROVALPROCESS.${e.response.data.errorCode}`)
                        }))
                    }
                });
            console.log(approvalProcess)
        } else
            setValid(true);
    }

    useEffect(() => {
        HttpService.get(`User/allActiveForApproval/${companyId}`, token)
            .then((response) => {
                setUsers(response.data)
            })
            .catch((e) => {
                console.log(e);
            });
    }, [])

    const clearAllData = () => {
        handleClose();
        setSpawn(1);
        setUserQueues([{ userId: '', queue: 1 }]);
        setApprovalProcess({
            name: '',
            companyId: companyId || '',
            userQueues: []
        })
    }

    useEffect(() => {
        const userInValid = userQueues.some(item => item.userId === '');
        setValid(userInValid);

        updateApprovalProcessData({ userQueues: userQueues });
    }, [userQueues]);

    const changedUser = (id: string, queue: number) => {
        const updatedIndex = userQueues.findIndex(item => item.queue === queue);
        console.log(updatedIndex)

        if (updatedIndex !== -1) {
            const updatedQueues = [...userQueues];
            updatedQueues[updatedIndex] = { userId: id, queue: queue };

            setUserQueues(updatedQueues);
        }
    }

    const addUserLine = () => {
        if (spawn < 5) {
            setUserQueues([...userQueues, { userId: '', queue: spawn + 1 }]);
            setSpawn(spawn + 1);
        }
    }
    const deleteThisLine = () => {
        if (spawn !== 1) {
            const userIndexToDelete = userQueues.findIndex(item => item.queue === spawn);
            const updatedQueues = userQueues.filter((_, index) => index !== userIndexToDelete);
            setUserQueues(updatedQueues);
            setSpawn(spawn - 1);
        }
    }
    return (
        <Modal
            id='create_employee_modal'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-500px'
            show={show}
            onHide={handleClose}
            backdrop={true}
        ><div className='modal-header'>
                <h2>Onay Sureci Ekle</h2>

            </div>

            <div className='modal-body py-lg-10 px-lg-10'>
                <form>

                    {valid && (<div className='col-md-12 alert alert-danger'>
                        <span className='alert-text font-weight-bold'>
                            Bir veya birkaç alan boş
                        </span></div>
                    )}
                    <div className='row g-5'>
                        <div className='col-md-12'>
                            <div className='mb-2'>
                                <label className='form-label'>Onay sureci ismi</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='firstName'
                                    value={approvalProcess?.name}
                                    onChange={(e) => updateApprovalProcessData({ name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label'>Kisiler</label>
                            {Array.from({ length: spawn }).map((_, index) => {
                                return (
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">{index + 1}.</span>
                                        </div>
                                        <select
                                            className='form-control form-select'
                                            data-live-search="true"
                                            onChange={(e) => changedUser(e.target.value, index + 1)}
                                        >
                                            <option value=''> Kisi Seciniz</option>
                                            {users &&
                                                users.map((user) => {
                                                    const userInQueue = userQueues.some(item => item.userId === user.id && item.queue !== index + 1)
                                                    if (!userInQueue) {
                                                        return (
                                                            <option key={user.id} value={user.id} className='text-dark'>
                                                                {user.fullName}
                                                            </option>
                                                        )
                                                    }
                                                    return null;
                                                })
                                            }
                                        </select>
                                        <div className="input-group-append">
                                            <button type="button" className="btn btn-icon btn-danger form-control" onClick={deleteThisLine}>
                                                <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-4' />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='col-md-4'>
                            <div className='mb-5'>
                                <button type='button' className="btn btn-bg-light btn-light" onClick={addUserLine}>Kisi Ekle</button>
                            </div>
                        </div>

                    </div>

                    <div className='d-flex justify-content-end'>
                        <div className='d-flex justify-content-center'>
                            <button type='button' className='btn btn-secondary me-3' onClick={clearAllData}>
                                İptal Et
                            </button>
                            <button disabled={valid || loading} type='button' className='btn btn-primary' onClick={createApprovalProcess} >
                                {!loading && <span className='indicator-label'>Oluştur</span>}
                                {loading && (
                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                        Lütfen bekleyin...
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </Modal >
    )
}

export default ApprovalAddedModal;

