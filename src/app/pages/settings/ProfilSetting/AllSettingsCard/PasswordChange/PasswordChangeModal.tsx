import { current } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import { useDispatch } from "react-redux";
import HttpService from "../../../../../services/HttpService";
import * as Yup from 'yup'
import { useFormik } from "formik";
import clsx from "clsx";
import { PasswordMeterComponent } from "../../../../../../_metronic/assets/ts/components";
import { notification } from "antd";
import { type } from "os";
import { showNotification } from "../../../../../actions/notificationAction";
import { AUTH_LOCAL_STORAGE_KEY, useAuth } from "../../../../../modules/auth";
import { customJwtDecode } from "../../../../../CustomJwt";

type Props = {
    show: boolean,
    handleClose: () => void
}
// public string Email { get; init; } // todo simdilik degistirdim
// public string CurrentPassword { get; init; }
// public string NewPassword { get; init; }
// public string ConfirmNewPassword { get; set; }
interface IPasswordChange {
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

type Decoder = {
    Email: string
}

const registrationSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .required('Mevcut sifre zorunlu'),
    newPassword: Yup.string()
        .min(6, 'Minimum 6 karakter')
        .max(50, 'Maximum 50 karakter')
        .required('Yeni sifre zorunlu')
        .test('differentPassword', 'Yeni şifre mevcut şifre ile aynı olamaz', function (value) {
            return value !== this.parent.currentPassword;
        }),
    confirmNewPassword: Yup.string()
        .required('Yeni sifre onayı zorunlu')
        .when('newPassword', {
            is: (val: string) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf([Yup.ref('newPassword')], "Şifre ve Şifreyi Onayla eşleşmedi"),
        }),
})

const PasswordChangeModal = ({ show, handleClose }: Props) => {
    const token: any = Cookies.get('authToken')
    const decode: Decoder = customJwtDecode(token);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const passwordChange: IPasswordChange = {
        email: decode.Email,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }
    const formik = useFormik({
        initialValues: passwordChange,
        validationSchema: registrationSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            formik.setStatus('');
            setLoading(true)
            HttpService.post('Auth/changepassword', values, token)
                .then(() => {
                    setLoading(false);
                })
                .then(() => {
                    clearDataCancel();
                })
                .then(() => {
                    dispatch(showNotification({ type: "success", message: "Sifre başarıyla Degistirildi." }));
                })
                .catch((error) => {
                    console.error(error)
                    dispatch(showNotification({ type: "error", message: 'Mevcut Sifre Hatali' }));
                    setLoading(false)
                    setSubmitting(false)
                })
        },
    })

    useEffect(() => {
        formik.resetForm()
    }, [show])

    const clearDataCancel = () => {
        formik.resetForm();
        handleClose();
    }
    return (
        <Modal
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-500px'
            show={show}
            onHide={handleClose}
            backdrop={true}
        >
            <div className="modal-header">
                <h2 className="modal-title">Şifre Değişikliği</h2>
            </div>
            <div className="modal-body">
                <form
                    className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
                    noValidate
                    id='kt_login_signup_form'
                    onSubmit={formik.handleSubmit}
                >
                    {formik.status && (
                        <div className='alert alert-danger'>
                            <div className='alert-text font-weight-bold'>{formik.status}</div>
                        </div>
                    )}
                    <div className="row">
                        <div className='fv-row mb-8' data-kt-password-meter='true'>
                            <div className='mb-1'>
                                <label className='form-label fw-bolder text-dark fs-6'>Mevcut Şifre</label>
                                <div className='position-relative mb-3'>
                                    <input
                                        type='password'
                                        placeholder='Mevcut Şifre'
                                        autoComplete='off'
                                        {...formik.getFieldProps('currentPassword')}
                                        className={clsx(
                                            'form-control bg-transparent',
                                            {
                                                'is-invalid': formik.touched.currentPassword && formik.errors.currentPassword,
                                            },
                                            {
                                                'is-valid': formik.touched.currentPassword && !formik.errors.currentPassword,
                                            }
                                        )}
                                    />
                                    {formik.touched.currentPassword && formik.errors.currentPassword && (
                                        <div className='fv-plugins-message-container'>
                                            <div className='fv-help-block'>
                                                <span role='alert'>{formik.errors.currentPassword}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='fv-row mb-4' data-kt-password-meter='true'>
                            <div className='mb-1'>
                                <label className='form-label fw-bolder text-dark fs-6'>Yeni Şifre</label>
                                <div className='position-relative mb-3'>
                                    <input
                                        type='password'
                                        placeholder='Yeni Şifre'
                                        autoComplete='off'
                                        {...formik.getFieldProps('newPassword')}
                                        className={clsx(
                                            'form-control bg-transparent',
                                            {
                                                'is-invalid': formik.touched.newPassword && formik.errors.newPassword,
                                            },
                                            {
                                                'is-valid': formik.touched.newPassword && !formik.errors.newPassword,
                                            }
                                        )}
                                    />
                                    {formik.touched.newPassword && formik.errors.newPassword && (
                                        <div className='fv-plugins-message-container'>
                                            <div className='fv-help-block'>
                                                <span role='alert'>{formik.errors.newPassword}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='fv-row mb-5'>
                            <label className='form-label fw-bolder text-dark fs-6'>Yeni Şifre Tekrar</label>
                            <input
                                type='password'
                                placeholder='Yeni Şifre Tekrar'
                                autoComplete='off'
                                {...formik.getFieldProps('confirmNewPassword')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    {
                                        'is-invalid': formik.touched.confirmNewPassword && formik.errors.confirmNewPassword,
                                    },
                                    {
                                        'is-valid': formik.touched.confirmNewPassword && !formik.errors.confirmNewPassword,
                                    }
                                )}
                            />
                            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.confirmNewPassword}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='d-flex align-item-center justify-content-end mt-5'>
                        <button
                            type='button'
                            id='kt_login_signup_form_cancel_button'
                            className='btn btn-lg btn-secondary me-5'
                            onClick={clearDataCancel}
                        >
                            İptal Et
                        </button>
                        <button
                            type='submit'
                            id='kt_sign_up_submit'
                            className='btn btn-lg btn-primary'
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {!loading && <span className='indicator-label'>Değiştir</span>}
                            {loading && (
                                <span className='indicator-progress' style={{ display: 'block' }}>
                                    Lütfen bekleyin...
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default PasswordChangeModal;