import { useState } from "react";
import HttpService from "../../../../services/HttpService";
import { showNotification } from "../../../../actions/notificationAction";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import LeaveRequestDateDifference from "./LeaveRequestDateDifference";
import { useTranslation } from "react-i18next";

type Props = {
    handleClose: () => void
}

export interface IRequestPermissionData {
    totalDays: number
    startDate: any
    endDate: any
    description: string
    isProcessed: boolean
    isApproved: boolean
}


const CreateNewPermissionForm = ({ handleClose }: Props) => {
    const [isValid, setValid] = useState(true)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { t } = useTranslation();
    const [requestData, setRequestData] = useState<IRequestPermissionData>({
        totalDays: 0,
        startDate: '',
        endDate: '',
        description: '',
        isProcessed: false,
        isApproved: false,
    })
    const updateRequestPermissionData = (fieldsToUpdate: Partial<IRequestPermissionData>) => {
        const updatedData = { ...requestData, ...fieldsToUpdate }
        setRequestData(updatedData)
    }

    const clearAllData = () => {
        handleClose();
        setRequestData({
            totalDays: 0,
            startDate: '',
            endDate: '',
            description: '',
            isProcessed: false,
            isApproved: false,
        })
    }

    const handleCreateLeaveRequest = () => {
        setLoading(true)
        console.log(requestData);
        HttpService.post('LeaveRequest/create', requestData, Cookies.get('authToken'))
            .then(() => {
                setLoading(false)
                dispatch(showNotification(
                    {
                        type: 'success',
                        message: t(`MESSAGES.SUCCESSES.CREATE.LEAVEREQUEST.SLeaveC01`)
                    }))
            })
            .then(() => {
                clearAllData()
                navigate(`/requests/myrequest`)
            })
            .catch((err) => {
                console.log(err)
                const data = err.response.data;
                const statusCode = data.statusCode;
                if (statusCode == 404) {
                    dispatch(showNotification(
                        {
                            type: 'warning',
                            message: t(`MESSAGES.WARNING.CREATE.LEAVEREQUEST.${data.errorCode}`)
                        }))
                }
                if (statusCode == 400) {
                    dispatch(showNotification(
                        {
                            type: "error",
                            message: t(`MESSAGES.ERRORS.CREATE.LEAVEREQUEST.${data.errorCode}`)
                        }
                    ))
                }
                else {
                    dispatch(showNotification(
                        {
                            type: "error",
                            message: "Something went wrong!!" // todo t(`MESSAGES.ERRORS.CREATE.LEAVEREQUEST.${data.errorCode}`)
                        }
                    ))
                }
                setLoading(false)
            })
    }
    return (
        <form>
            {isValid && (
                <div className='col-md-12 alert alert-danger'>
                    <span className='alert-text'>
                        Başlangıç tarihi bugün ve bugünden önce olamaz
                    </span>
                </div>
            )}
            <div className='row'>
                <div className='col-md-12'>
                    <div className='mb-5'>
                        <label className='form-label'>
                            {t('REQUESTPERMISSION.PAGE.CREATE.PERMISSION.TOTALPLACE')}
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            name='TotalDays'
                            value={requestData.totalDays}
                            readOnly
                        />
                    </div>
                </div>
                <LeaveRequestDateDifference
                    setValid={setValid}
                    isValid={isValid}
                    requestData={requestData}
                    updateRequestPermissionData={updateRequestPermissionData}
                />
                <div className='col-md-15'>
                    <div className='d-flex flex-column '>
                        <label className='form-label'>
                            {t('REQUESTPERMISSION.PAGE.CREATE.PERMISSION.DESCRIPTION')}
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            name='Description'
                            value={requestData.description}
                            onChange={(e) => updateRequestPermissionData({ description: e.target.value })}
                        />
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end mt-10'>
                <button type='button' className='btn btn-danger me-3' onClick={clearAllData}>
                    Iptal
                </button>
                <button disabled={isValid} type='button' className='btn btn-primary' onClick={handleCreateLeaveRequest}>
                    {!loading && <span className='indicator-label'>Oluştur</span>}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                            Lütfen bekleyin...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                    )}
                </button>
            </div>
        </form>
    )
}

export default CreateNewPermissionForm;