/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, getUserInfosByToken, login, REGISTER_URL} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'
import Cookies from 'js-cookie'
import {useDispatch} from 'react-redux'
import {showNotification} from '../../../actions/notificationAction'
import {UserModel} from '../core/_models'
import HttpService from '../../../services/HttpService'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: 'ibrahim@ates.com',
  password: 'ibrahim123',
  isActive: false,
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const {setCurrentUser} = useAuth()

  const saveAuthTokenToCookie = (authToken: any) => {
    const expirationDate = new Date()
    expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000)
    Cookies.set('authToken', authToken, {expires: expirationDate})
  }

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      login(values.email, values.password, values.isActive)
        .then((res) => {
          dispatch(
            showNotification({
              type: 'success',
              message: 'Giris Basarili',
            })
          )
          saveAuthTokenToCookie(res.data.data.token)
          //const {data: user} = await getUserByToken(null) // todo burasi duzeltilecek
          const user: UserModel = getUserInfosByToken(null)
          console.log(user)
          setCurrentUser(user)
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
          setStatus('The login details are incorrect')
          setSubmitting(false)
          setLoading(false)
        })
      /*const { data: user } = await getUserInfosByToken(auth.data.token)*/
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
      </div>

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
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

      {/* Radio Buttons for True/False */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6 mb-2'>
          Are you employee or customer?
        </label>
        <div className='form-switch form-switch-sm form-check-custom'>
          <input
            className='form-check-input w-50px h-30px'
            type='checkbox'
            checked={formik.values.isActive}
            {...formik.getFieldProps('isActive')}
            onChange={formik.handleChange}
          />
          <label className='form-check-label fw-3'>
            {formik.values.isActive ? `Employee` : `Customer`}
          </label>
        </div>
      </div>

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary mt-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>

      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Are you not a customer?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up customer
        </Link>
      </div>
    </form>
  )
}
