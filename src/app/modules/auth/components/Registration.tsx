/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {getUserByToken, register, REGISTER_URL} from '../core/_requests'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'
import {UserModel} from '../core/_models'
import {useDispatch} from 'react-redux'
import {showNotification} from '../../../actions/notificationAction'
import HttpService from '../../../services/HttpService'

export interface CustomerCreate {
  firstname: string
  lastname: string
  address: string
  phoneNumber: number
  email: string
  password: string
  passwordConfirm: string
  userName: string
}

const initialValues = {
  firstname: '',
  lastname: '',
  address: '',
  phoneNumber: 0,
  email: '',
  password: '',
  passwordConfirm: '',
  userName: '',
}

const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  address: Yup.string().max(100, 'Maximum 100 characters').required('Address is required'),
  userName: Yup.string()
    .min(6, 'Minimum 6 characters')
    .max(15, 'Maximum 15 characters')
    .required('UserName is required'),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, 'Phone number must contain only numeric characters')
    .length(11, 'Phone number must be exactly 11 characters')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  lastname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const {setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      const customer: CustomerCreate = {
        firstname: values.firstname,
        lastname: values.lastname,
        address: values.address,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        userName: values.userName,
      }
      HttpService.post(REGISTER_URL, customer)
        .then((res) => {
          dispatch(
            showNotification({
              type: 'success',
              message: 'Musteri basarili bir sekilde olusturuldu',
            })
          )
          //const {data: user} = await getUserByToken(null) // todo burasi duzeltilecek
          const user: UserModel = getUserByToken(null)
          setLoading(false)
          formik.resetForm()
        })
        .catch((err) => {
          const data = err.response.data
          dispatch(
            showNotification({
              type: 'error',
              message: `${data.messages}`,
            })
          )
          setLoading(false)
          setSubmitting(false)
        })
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>Sign Up Customer</h1>
      </div>

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Firstname */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>First name</label>
        <input
          placeholder='First name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('firstname')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.firstname && formik.errors.firstname,
            },
            {
              'is-valid': formik.touched.firstname && !formik.errors.firstname,
            }
          )}
        />
        {formik.touched.firstname && formik.errors.firstname && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.firstname}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
      <div className='fv-row mb-8'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-dark fs-6'>Last name</label>
        <input
          placeholder='Last name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('lastname')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.lastname && formik.errors.lastname,
            },
            {
              'is-valid': formik.touched.lastname && !formik.errors.lastname,
            }
          )}
        />
        {formik.touched.lastname && formik.errors.lastname && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.lastname}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>

      <div className='fv-row mb-8'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-dark fs-6'>UserName</label>
        <input
          placeholder='UserName'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('userName')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.userName && formik.errors.userName,
            },
            {
              'is-valid': formik.touched.lastname && !formik.errors.userName,
            }
          )}
        />
        {formik.touched.userName && formik.errors.userName && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.userName}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>

      {/* end::Form group */}
      <div className='fv-row mb-8'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-dark fs-6'>Address</label>
        <textarea
          autoComplete='off'
          {...formik.getFieldProps('address')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.address && formik.errors.address,
            },
            {
              'is-valid': formik.touched.address && !formik.errors.address,
            }
          )}
        />
        {formik.touched.address && formik.errors.address && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.address}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-dark fs-6'>Phone Number</label>
        <input
          type='tel'
          id='phoneNumber'
          pattern='[0-9]{10}'
          title='Please enter a 10-digit phone number'
          autoComplete='off'
          {...formik.getFieldProps('phoneNumber')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.phoneNumber && formik.errors.phoneNumber,
            },
            {
              'is-valid': formik.touched.phoneNumber && !formik.errors.phoneNumber,
            }
          )}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.phoneNumber}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>

      {/* begin::Form group Email */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className='text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik.getFieldProps('passwordConfirm')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.passwordConfirm && formik.errors.passwordConfirm,
            },
            {
              'is-valid': formik.touched.passwordConfirm && !formik.errors.passwordConfirm,
            }
          )}
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.passwordConfirm}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
