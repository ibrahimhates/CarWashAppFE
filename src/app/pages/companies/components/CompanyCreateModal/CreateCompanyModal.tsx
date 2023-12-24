
import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { defaultCreateCompanyData, ICreateCompanyData } from './steps/ICompanyModel'
import { StepperComponent } from '../../../../../_metronic/assets/ts/components'
import { KTSVG } from '../../../../../_metronic/helpers'
import { Step1Company } from './steps/Step1Company'
import { Step2Address } from './steps/Step2Address'
import { Step3Admin } from './steps/Step3Admin'
import HttpService from '../../../../services/HttpService'
import { Step4Completed } from './steps/Step4Completed'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { showNotification } from '../../../../actions/notificationAction'

type Props = {
  show: boolean
  handleClose: () => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateCompanyModal = ({ show, handleClose }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [data, setData] = useState<ICreateCompanyData>(defaultCreateCompanyData)
  const [hasError, setHasError] = useState(false)
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const updateData = (fieldsToUpdate: Partial<ICreateCompanyData>) => {
    const updatedData = { ...data, ...fieldsToUpdate }
    setData(updatedData)
  }

  const checkCompanyBasic = (): boolean => {
    if (!data.email || !data.phoneNumber  || !data.email) {
      return false
    }
    return true
  }

  const checkAddressBasic = (): boolean => {
    if (!data.companyAddress.address || !data.companyAddress.cityId || !data.companyAddress.countryId || !data.companyAddress.postCode) {
      return false
    }
    return true
  }

  const checkAdminBasic = (): boolean => {
    if (!data.users.firstName || !data.users.lastName || !data.users.email || !data.users.phoneNumber) {
      return false
    }
    return true
  }


  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()
  }

  const nextStep = () => {
    setHasError(false)
    if (!stepper.current) {
      return
    }

    if (stepper.current.getCurrentStepIndex() === 1) {
      if (!checkCompanyBasic()) {
        setHasError(true)
        return
      }
    }
    if (stepper.current.getCurrentStepIndex() === 2) {
      if (!checkAddressBasic()) {
        setHasError(true)
        return
      }
    }

    if (stepper.current.getCurrentStepIndex() === 3) {
      if (!checkAdminBasic()) {
        setHasError(true)
        return
      }
    }

    stepper.current.goNext()
  }
  
  
  const submit = () => {
    HttpService.post('Companies/create', data)
      .then((res) => {
        setData(defaultCreateCompanyData);  
        if (location.pathname === '/companies') {
          handleClose();
        } else {
          handleClose();
          navigate('/companies');
        }
        dispatch(showNotification(
          {
            type:"success",
            message:t(`MESSAGES.SUCCESSES.CREATE.COMPANY.SCompanyC01`)
          }));
      })
      .catch((err) => {
        const data = err.response.data;
        const statusCode = data.statusCode;

        if(statusCode == 400){
          dispatch(showNotification(
            {
              type:"error",
              message:t(`MESSAGES.ERRORS.CREATE.COMPANY.${data.errorCodes}`)
            }));
        }else if(statusCode == 404){
          dispatch(showNotification(
            {
              type:"warning",
              message:t(`MESSAGES.WARNINGS.CREATE.COMPANY.${data.errorCodes}`)
            }));
        }else{
          dispatch(showNotification(
            {
              type:"error",
              message:t(`Sirket eklenirken hata ile karsilandi. Lutfen daha sonra tekrar deneyin.`)//MESSAGES.WARNINGS.CREATE.COMPANY.${data.errorCodes}
            }));
        }
        console.log(err);
      });
  };
  

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>Şirket Oluştur</h2>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        {/*begin::Stepper */}
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          {/* begin::Aside*/}
          <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
            {/* begin::Nav*/}
            <div className='stepper-nav ps-lg-10'>
              {/* begin::Step 1*/}
              <div className='stepper-item current' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>1</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Şirket</h3>

                    <div className='stepper-desc'>Şirket bilgilerini girin</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 1*/}

              {/* begin::Step 2*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>2</span>
                  </div>
                  {/* begin::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Şirket Adresi</h3>

                    <div className='stepper-desc'>Şirket adres bilgilerini girin</div>
                  </div>
                  {/* begin::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 2*/}

              {/* begin::Step 3*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>3</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Şirket Hesap Yöneticisi</h3>

                    <div className='stepper-desc'>Şirket hesap yöneticisi bilgilerini girin</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 3*/}



                  {/* begin::Step 3*/}
                  <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>4</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Şirketi Oluştur!</h3>

                    <div className='stepper-desc'>Adımları tamamladın artık şirket oluşturabilirsin.</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 3*/}
            </div>
            {/* end::Nav*/}
          </div>
          {/* begin::Aside*/}

          {/*begin::Content */}
          <div className='flex-row-fluid py-lg-5 px-lg-15'>
            {/*begin::Form */}
            <form noValidate id='kt_modal_create_app_form'>
              <Step1Company data={data} updateData={updateData} hasError={hasError} />
              <Step2Address data={data} updateData={updateData} hasError={hasError} />
              <Step3Admin data={data} updateData={updateData} hasError={hasError} />
              <Step4Completed />

              {/*begin::Actions */}
              <div className='d-flex flex-stack pt-10'>
                <div className='me-2'>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-primary me-3'
                    data-kt-stepper-action='previous'
                    onClick={prevStep}
                  >
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr063.svg'
                      className='svg-icon-3 me-1'
                    />{' '}
                    Önceki
                  </button>
                </div>
                <div>
                  <button
                    type='button'
                    className='btn btn-lg btn-primary'
                    data-kt-stepper-action='submit'
                    onClick={submit}
                  >
                    Oluştur{' '}
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr064.svg'
                      className='svg-icon-3 ms-2 me-0'
                    />
                  </button>

                  <button
                    type='button'
                    className='btn btn-lg btn-primary'
                    data-kt-stepper-action='next'
                    onClick={nextStep}
                  >
                    Sonraki{' '}
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr064.svg'
                      className='svg-icon-3 ms-1 me-0'
                    />
                  </button>
                </div>
              </div>
              {/*end::Actions */}
            </form>
            {/*end::Form */}
          </div>
          {/*end::Content */}
        </div>
        {/* end::Stepper */}
      </div>
    </Modal>,
    modalsRoot
  )
}

export { CreateCompanyModal }
