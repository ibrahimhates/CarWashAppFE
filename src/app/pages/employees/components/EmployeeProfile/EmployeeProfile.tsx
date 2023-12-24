import React, { useState, useEffect } from 'react';
import HttpService from '../../../../services/HttpService'
import { Link, useParams } from 'react-router-dom'; // useParams eklenmiş


interface UserProfileModel {
  fullName?: string | null;
  title?: string | null;
  companyName?: string | null;
  countryName?: string | null;
  cityName?: string | null;
  businessPhoneNumber?: string | null;
  personalPhoneNumber?: string | null;
  startedDate?: Date | null;
  phoneNumber?: string | null;
}

type Props = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const EmployeeProfile: React.FC<Props> = ({ loading, setLoading }) => {

  const { id } = useParams();
  const [employee, setEmployee] = useState<UserProfileModel | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await HttpService.get(`User/profile/${id}`);
        console.log(response.data)
        setEmployee(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchEmployee();
  }, []);


  function formatDateTime(date: Date | null | undefined) {
    if (date) {
      const d = new Date(date);
      const ye = new Intl.DateTimeFormat('tr', { year: 'numeric' }).format(d);
      const mo = new Intl.DateTimeFormat('tr', { month: 'short' }).format(d);
      const da = new Intl.DateTimeFormat('tr', { day: '2-digit' }).format(d);
      return `${da}-${mo}-${ye}`;
    }
    return '';
  }


  return (

    <>
      {
        !loading && (

          <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <div className='card-header cursor-pointer'>
              <div className='card-title m-0'>
                <h3 className='fw-bolder m-0'>Profile Details</h3>
              </div>


            </div>

            <div className='card-body p-9'>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Ad Soyad</label>

                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>{employee?.fullName}</span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Şirket</label>

                <div className='col-lg-8 fv-row'>
                  <span className='fw-bold fs-6'>{employee?.companyName}</span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>İş Telefon</label>

                <div className='col-lg-8 d-flex align-items-center'>
                  <span className='fw-bolder fs-6 me-2'>{employee?.businessPhoneNumber}</span>
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Kişisel Telefon</label>

                <div className='col-lg-8 d-flex align-items-center'>
                  <span className='fw-bolder fs-6 me-2'>{employee?.phoneNumber}</span>
                </div>
              </div>


              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Lokasyon</label>

                <div className='col-lg-8'>
                  {employee?.countryName != null && employee?.cityName != null && (
                    <span className='fw-bolder fs-6 text-dark'>
                      {employee?.countryName + '/' + employee?.cityName}
                    </span>
                  )}
                </div>
              </div>

              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Ünvan</label>

                <div className='col-lg-8'>
                  <a href='#' className='fw-bold fs-6 text-dark text-hover-primary'>
                    {employee?.title}
                  </a>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>İşe Başlama Tarihi</label>
                <div className='col-lg-8'>
                  {/* <span className='fw-bolder fs-6 text-dark'>{employee?.startedDate?.toDateString()}</span> */}
                  <span className='fw-bolder fs-6 text-dark'>{formatDateTime(employee?.startedDate)}</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>

  )
};

export default EmployeeProfile;
