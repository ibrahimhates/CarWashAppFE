import {useAuth} from '../../modules/auth'

const ProfilePage = () => {
  const auth = useAuth()

  return (
    <div className='card-body'>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Ad</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{auth?.currentUser?.firstName}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Soyad</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{auth?.currentUser?.lastName}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Ad Soyad</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{auth?.currentUser?.fullName}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{auth?.currentUser?.email}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Telefon</label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{auth?.currentUser?.phoneNumber}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Adres</label>

            <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>
                  {auth.currentUser?.address}
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
