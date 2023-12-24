
import { StepProps } from './ICompanyModel'
import { useState } from 'react'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'

const Step1Company = ({ data, updateData, hasError }: StepProps) => {
  const [avatarFile, setAvatarFile] = useState(null);

  const handleAvatarChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = function (e: any) {
        const imageData = e.target.result;
        const base64ImageData = imageData.split(',')[1];
        console.log(base64ImageData)
        updateData({
          logo: base64ImageData
        });

      };
      reader.readAsDataURL(file);


    
    }
  };


  return (
    <div className='current' data-kt-stepper-element='content'>
      <div className='w-100'>
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Şirket Logo</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <label className='image-input image-input-outline cursor-pointer'>
            <div
              className='image-input-wrapper w-125px h-125px'
              style={{
                backgroundColor: '#EBEDF4',
                backgroundImage: avatarFile
                  ? `url(${URL.createObjectURL(avatarFile)})`
                  : `url(${toAbsoluteUrl('/media/avatars/question_black.png')})`,
              }}
            ></div>
            <input
              type='file'
              name='avatar'
              accept='image/*'
              onChange={handleAvatarChange}
              className='d-none'
            />
          </label>
          {!data.logo && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='logo' data-validator='notEmpty' className='fv-help-block'>
                Logo is required
              </div>
            </div>
          )}
        </div>






        {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Şirket Adı</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='companyName'
            placeholder=''
            value={data.name}
            onChange={(e) =>
              updateData({
                name: e.target.value
              })
            }
          />
          {!data.name && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='address' data-validator='notEmpty' className='fv-help-block'>
                Company name is required
              </div>
            </div>
          )}
        </div>
        {/*end::Form Group */}




        {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Şirket Email</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <input
            type='email'
            className='form-control form-control-lg form-control-solid'
            name='email'
            placeholder=''
            value={data.email}
            onChange={(e) =>
              updateData({
                email: e.target.value
              })
            }
          />
          {!data.email && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='email' data-validator='notEmpty' className='fv-help-block'>
                Company email is required
              </div>
            </div>
          )}
        </div>
        {/*end::Form Group */}


        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Şirket Telefon Numarası</span>
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
            value={data.phoneNumber}
            onChange={(e) =>
              updateData({
                phoneNumber: e.target.value
              })
            }
          />
          {!data.phoneNumber && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='phoneNumber' data-validator='notEmpty' className='fv-help-block'>
                Phone number is required
              </div>
            </div>
          )}
        </div>



      </div>
    </div>
  )
}

export { Step1Company }
