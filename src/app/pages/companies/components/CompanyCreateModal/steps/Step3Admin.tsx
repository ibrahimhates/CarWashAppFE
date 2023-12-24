import { StepProps } from './ICompanyModel'

const Step3Admin = ({ data, updateData, hasError }: StepProps) => {
  return (
    <div data-kt-stepper-element='content'>
      <div className='w-100'>
        {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Hesap Yöneticisi Adı</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='firstname'
            placeholder=''
            value={data.users.firstName}
            onChange={(e) =>
              updateData({
                users: 
                  {
                    ...data.users,
                    firstName: e.target.value
                  }
                
              })
            }
          />
          { hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                Company admin name is required
              </div>
            </div>
          )}
        </div>
        {/*end::Form Group */}




        {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Hesap Yöneticisi Soyadı</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='lastname'
            placeholder=''
            value={data.users.lastName}
            onChange={(e) =>
              updateData({
                users: 
                  {
                    ...data.users,
                    lastName: e.target.value
                  }
                
              })
            }
          />
          {hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='email' data-validator='notEmpty' className='fv-help-block'>
                Company Admin lastname  is required
              </div>
            </div>
          )}
        </div>
        {/*end::Form Group */}


        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Hesap Yöneticisi Mail </span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='email'
            placeholder=''
            value={data.users.email}
            onChange={(e) =>
              updateData({
                users: 
                  {
                    ...data.users,
                    email: e.target.value
                  }
                
              })
            }
          />
          {hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='phoneNumber' data-validator='notEmpty' className='fv-help-block'>
                Company Admin Email is required
              </div>
            </div>
          )}
        </div>

        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Hesap Yöneticisi Telefon Numarası </span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='phoneNumber'
            placeholder=''
            value={data.users.phoneNumber}
            onChange={(e) =>
              updateData({
                users : 
                  {
                    ...data.users,
                    phoneNumber: e.target.value
                  } 
                
                
              })
            }

          />
          {hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='logo' data-validator='notEmpty' className='fv-help-block'>
                Company admin phone number is required
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export { Step3Admin }
