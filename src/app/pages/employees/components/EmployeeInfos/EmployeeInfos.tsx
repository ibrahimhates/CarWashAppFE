import React, { useEffect, useState } from 'react'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { useParams } from 'react-router-dom'
import HttpService from '../../../../services/HttpService'
import Cookies from 'js-cookie'
import moment from 'moment'
import { headerDetail } from '../../EmployeeDetailPage'
import { BeatLoader } from 'react-spinners'
import { customJwtDecode } from '../../../../CustomJwt'

interface UserPersonalInfoModel {
  id?: string
  userId?: string
  dateOfBirth?: string
  tcKimlikNo?: string
  maritalStatus?: boolean
  gender?: string
  profilePicture?: string
  disabilityDegree?: string
  childrenCount?: string
  emergencyTel?: string
  socialMedia?: string
  lastCompletedEducationalInstitution?: string
  bloodGroupId?: string
  educationLevelId?: string
  nationalityId?: string
}

type EmployeePersonalInfosProps = {
  headerDetail: headerDetail
  setHeaderDetail: (headerDetail: headerDetail) => void
  role: string
}

interface UserGeneralInfoModel {
  userId?: string
  firstName: string
  lastName: string
  companyName: string
  businessPhoneNumber: string
  phoneNumber: string
  email: string
  contractIndefinite: string
  startedDate: string
  contractEndDate: string
  profilePicture: string
  role: string
}

type EmployeeProfileProps = {
  headerDetail: headerDetail
  setHeaderDetail: (headerDetail: headerDetail) => void
  role: string
}

const EmployeeInfos: React.FC<EmployeeProfileProps> = ({ headerDetail, setHeaderDetail, role }) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(false);
  


  const [employeeInfos, setEmployeeInfos] = useState<UserGeneralInfoModel>({
    firstName: '',
    lastName: '',
    companyName: '',
    businessPhoneNumber: '',
    phoneNumber: '',
    email: '',
    contractIndefinite: '',
    startedDate: '',
    contractEndDate: '',
    profilePicture: '',
    role: '',
  })

  
  const [roles, setRoles] = useState<any[]>([])
  var userRole: string = ''
  

  // Kişisel bilgiler

  const [personalInfos, setPersonalInfos] = useState<UserPersonalInfoModel | null>(null)
  const [nationalities, setNationalities] = useState<any[]>([])
  const [bloodGroups, setBloodGroups] = useState<any[]>([])
  const [educationLevels, setEducationLevels] = useState<any[]>([])

  const fecthEmployeePersonalInfos = async () => {
    try {
      const personalInfo = await HttpService.get(`User/profile/personalInfos/${id}`);
      console.log(personalInfo.data)
      setPersonalInfos(personalInfo.data);
      const nationalities = await HttpService.get('Nationality/all');
      setNationalities(nationalities.data);
      const bloodGroups = await HttpService.get('BloodGroup/all');
      setBloodGroups(bloodGroups.data);
      const educationLevels = await HttpService.get('EducationLevel/all');
      setEducationLevels(educationLevels.data);
      console.log(educationLevels.data)
      
      setLoading(false)
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fecthEmployeePersonalInfos();
  }, []);


  const handleSubmitPersonelInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (personalInfos) {
      try {
        personalInfos.userId = id;
        console.log(personalInfos);
        HttpService.put(`PersonalInfo/update`, personalInfos).then((response) => {
          console.log(response.data);
        }).catch((error) => {
          console.log(error);
        })
        console.log('Form data submitted successfully!');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  //----------------------------


  useEffect(() => {
    setLoading(true);
    const fetchEmployeeInfos = async () => {
      try {
        const token: any = Cookies.get('authToken')
        const decodedToken: any = customJwtDecode(token)
        userRole = decodedToken.role
        const response = await HttpService.get(`User/profile/generalInfos/${id}`)
        const responseRoles = await HttpService.get(`Auth/role`)
        console.log('general infos -> ' + response.data)
        setRoles(responseRoles.data)
        setEmployeeInfos(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error:', error)
        setLoading(false);
      }
    }
    fetchEmployeeInfos()
  }, [])

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setAvatarFile(file)

      const reader = new FileReader()
      reader.onload = function (e) {
        const imageData = e.target?.result
        if (typeof imageData === 'string') {
          const base64ImageData = imageData.split(',')[1]
          console.log(base64ImageData)
          setEmployeeInfos((prevEmployeeInfos) => ({
            ...prevEmployeeInfos,
            profilePicture: base64ImageData,
          }))
        }
      }
      reader.readAsDataURL(file)
      console.log(employeeInfos)
    }
  }

  const handleStartDateChange = (date: string) => {
    setEmployeeInfos((prevEmployeeInfos) => ({
      ...prevEmployeeInfos,
      startedDate: date,
    }))
  }

  const handleEndDateChange = (date: string) => {
    setEmployeeInfos((prevEmployeeInfos) => ({
      ...prevEmployeeInfos,
      contractEndDate: date,
    }))
    console.log(employeeInfos)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (employeeInfos) {
      try {
        employeeInfos.userId = id
        console.log(employeeInfos)
        HttpService.put(`User/profile/generalInfos/update`, employeeInfos).then((response) => {
          console.log(response.data)
          setHeaderDetail({
            ...headerDetail,
            fullName: employeeInfos.firstName + ' ' + employeeInfos.lastName,
            businessPhoneNumber: employeeInfos.businessPhoneNumber,
            email: employeeInfos.email,
            profilePicture: employeeInfos.profilePicture,
          })
        })
      } catch (error) {
        console.error('Error:', error)
      }
    }

    if (personalInfos) {
      try {
        personalInfos.userId = id;
        console.log(personalInfos);
        HttpService.put(`PersonalInfo/update`, personalInfos).then((response) => {
          console.log(response.data);
        }).catch((error) => {
          console.log(error);
        })
        console.log('Form data submitted successfully!');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  return (
    <>
      {
        loading ? (
          <div className='d-flex justify-content-center' >
            <BeatLoader color='#0095e8' loading={loading} size={20} />
          </div >) :
          (


            <div className='card mb-5 mb-xl-10'>
              <div
                className='card-header border-0 cursor-pointer'
                role='button'
                data-bs-toggle='collapse'
                data-bs-target='#kt_account_profile_details'
                aria-expanded='true'
                aria-controls='kt_account_profile_details'
              >
                <div className='card-title m-0'>
                  <h3 className='fw-bolder m-0'>Profile Details</h3>
                </div>
              </div>

              <div id='kt_account_profile_details' className='collapse show'>
                <form className='form' onSubmit={handleSubmit}>
                  <div className='card-body border-top p-9 '>
                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
                      <div className='col-lg-8'>
                        <label className='image-input image-input-outline cursor-pointer'>
                          <div
                            className='image-input-wrapper w-125px h-125px'
                            style={{
                              backgroundImage: avatarFile
                                ? `url(${URL.createObjectURL(avatarFile)})`
                                : employeeInfos.profilePicture
                                  ? `url(data:image/png+svg+xml;base64,${employeeInfos.profilePicture})`
                                  : `url(${toAbsoluteUrl('/media/avatars/blank.png')})`,
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
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label  fw-bold fs-6'>Ad Soyad</label>

                      <div className='col-lg-8'>
                        <div className='row'>
                          <div className='col-lg-6 fv-row'>
                            <input
                              type='text'
                              className='form-control form-control-lg form-control-solid mb-3 mb-lg-0 required'
                              placeholder='Ad'
                              value={employeeInfos.firstName}
                              onChange={(e) => {
                                setEmployeeInfos({ ...employeeInfos, firstName: e.target.value })
                              }}
                            />
                          </div>

                          <div className='col-lg-6 fv-row'>
                            <input
                              type='text'
                              className='form-control form-control-lg form-control-solid required'
                              placeholder='Soyad'
                              value={employeeInfos.lastName}
                              onChange={(e) => {
                                setEmployeeInfos({ ...employeeInfos, lastName: e.target.value })
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label  fw-bold fs-6'>Şirket</label>

                      <div className='col-lg-8 fv-row'>
                        <input
                          type='text'
                          className='form-control form-control-lg form-control-solid'
                          placeholder='Şirket Adı'
                          value={employeeInfos.companyName}
                          onChange={(e) => {
                            setEmployeeInfos({ ...employeeInfos, companyName: e.target.value })
                          }}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>
                        <span>Telefon (İş)</span>
                      </label>

                      <div className='col-lg-8 fv-row'>
                        <input
                          type='tel'
                          className='form-control form-control-lg form-control-solid'
                          placeholder='Telefon (İş)'
                          value={employeeInfos.businessPhoneNumber}
                          onChange={(e) => {
                            setEmployeeInfos({ ...employeeInfos, businessPhoneNumber: e.target.value })
                          }}
                          minLength={11}
                          maxLength={11}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>
                        <span>Telefon (Kişisel)</span>
                      </label>

                      <div className='col-lg-8 fv-row'>
                        <input
                          type='tel'
                          className='form-control form-control-lg form-control-solid'
                          placeholder='Telefon (Kişisel)'
                          value={employeeInfos.phoneNumber}
                          onChange={(e) => {
                            setEmployeeInfos({ ...employeeInfos, phoneNumber: e.target.value })
                          }}
                          minLength={11}
                          maxLength={11}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>
                        <span>E-posta(İş)</span>
                      </label>

                      <div className='col-lg-8 fv-row'>
                        <input
                          type='email'
                          className='form-control form-control-lg form-control-solid'
                          placeholder='E-posta(İş)'
                          value={employeeInfos.email}
                          onChange={(e) => {
                            setEmployeeInfos({ ...employeeInfos, email: e.target.value })
                          }}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Sözleşme Türü</label>
                      <div className='col-lg-8 fv-row'>
                        <select
                          className='form-select form-select-solid form-select-lg'
                          value={employeeInfos.contractIndefinite}
                          onChange={(e) => {
                            const newValue = e.target.value
                            setEmployeeInfos((prevEmployeeInfos) => ({
                              ...prevEmployeeInfos,
                              contractIndefinite: newValue,
                            }))
                          }}
                        >
                          <option value='Süresiz'>Süresiz</option>
                          <option value='Süreli'>Süreli</option>
                        </select>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>İşe Başlama Tarihi</label>
                      <div className='col-lg-8 fv-row'>
                        <input
                          type='date'
                          className='form-control form-control-lg form-control-solid'
                          name='startDate'
                          value={moment(employeeInfos.startedDate).format('YYYY-MM-DD')}
                          onChange={(e) => handleStartDateChange(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Sözleşme Bitiş Tarihi</label>
                      <div className='col-lg-8 fv-row'>
                        <input
                          type='date'
                          className='form-control form-control-lg form-control-solid'
                          name='endDate'
                          value={
                            employeeInfos.contractIndefinite === 'Süresiz'
                              ? ''
                              : moment(employeeInfos.contractEndDate).format('YYYY-MM-DD')
                          }
                          onChange={(e) => handleEndDateChange(e.target.value)}
                          readOnly={employeeInfos.contractIndefinite === 'Süresiz'}
                        />
                      </div>
                    </div>
                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Erişim Türü</label>
                      <div className='col-lg-8 fv-row'>
                        <select className='form-select form-select-solid form-select-lg'>
                          {roles.map((roleItem: any) => (
                            <option
                              value={roleItem.roleName}
                              key={roleItem.id}
                              selected={roleItem.roleName === employeeInfos.role}
                            >
                              {roleItem.roleName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className='card-body p-9' style={{marginTop: "-4rem"}}>
                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Doğum Tarihi</label>
                      <div className='col-lg-8 fv-row'>
                        <input
                          type='date'
                          className='form-control form-control-lg form-control-solid'
                          name='birthDate'
                          value={
                            personalInfos?.dateOfBirth !== '0001-01-01T00:00:00'
                              ? moment(personalInfos?.dateOfBirth).format('YYYY-MM-DD')
                              : moment().format('YYYY-MM-DD')
                          }
                          onChange={(e) => {
                            setPersonalInfos({
                              ...personalInfos,
                              dateOfBirth:
                                e.target.value !== '0001-01-01T00:00:00'
                                  ? e.target.value
                                  : moment().format('YYYY-MM-DD'),
                            })
                          }}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label  fw-bold fs-6'>Kimlik Numarası</label>
                      <div className='col-lg-8 fv-row'>
                        <input
                          type='text'
                          className='form-control form-control-lg form-control-solid'
                          placeholder={'Kimlik No'}
                          value={personalInfos?.tcKimlikNo}
                          onChange={(e) => {
                            setPersonalInfos({ ...personalInfos, tcKimlikNo: e.target.value })
                            console.log(personalInfos)
                          }}
                          minLength={11}
                          maxLength={11}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Medeni Hal</label>
                      <div className='col-lg-8 fv-row'>
                        <select
                          className='form-select form-select-solid form-select-lg'
                          value={personalInfos?.maritalStatus ? 'married' : 'single'}
                          onChange={(e) => {
                            const newValue = e.target.value
                            const newMaritalStatus = newValue === 'married'
                            setPersonalInfos({ ...personalInfos, maritalStatus: newMaritalStatus })
                            console.log(personalInfos)
                          }}
                        >
                          <option value='single'>Bekar</option>
                          <option value='married'>Evli</option>
                        </select>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Engel Derecesi</label>
                      <div className='col-lg-8 fv-row'>
                        <select className='form-select form-select-solid form-select-lg'>
                          <option value='' disabled selected>
                            Engel Derecesi Seçin
                          </option>
                          <option value='0'>Yok</option>
                          <option value='1'>1. derece</option>
                          <option value='2'>2. derece</option>
                          <option value='3'>3. derece</option>
                        </select>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Uyruğu</label>
                      <div className='col-lg-8 fv-row'>
                        <select
                          className='form-select form-select-solid form-select-lg'
                          value={personalInfos?.nationalityId}
                          onChange={(e) => {
                            const newValue = e.target.value
                            setPersonalInfos({ ...personalInfos, nationalityId: newValue })
                          }}
                        >
                          <option value=''>Uyruk Seçin</option>
                          {nationalities.map((nationality) => (
                            <option key={nationality.id} value={nationality.id}>
                              {nationality.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>
                        <span>Çocuk Sayısı</span>
                      </label>
                      <div className='col-lg-8 fv-row'>
                        <input
                          type='text'
                          className='form-control form-control-lg form-control-solid'
                          placeholder='Çocuk Sayısı'
                          value={personalInfos?.childrenCount}
                          onChange={(e) => {
                            setPersonalInfos({ ...personalInfos, childrenCount: e.target.value })
                          }}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Kan Grubu</label>
                      <div className='col-lg-8 fv-row'>
                        <select
                          className='form-select form-select-solid form-select-lg'
                          value={personalInfos?.bloodGroupId}
                          onChange={(e) => {
                            const newValue = e.target.value
                            setPersonalInfos({ ...personalInfos, bloodGroupId: newValue })
                          }}
                        >
                          <option value=''>Kan Grubu Seçin</option>
                          {bloodGroups.map((bloodGroup) => (
                            <option key={bloodGroup.id} value={bloodGroup.id}>
                              {bloodGroup.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Eğitim Durumu</label>
                      <div className='col-lg-8 fv-row'>
                        <select
                          className='form-select form-select-solid form-select-lg'
                          value={personalInfos?.educationLevelId}
                          onChange={(e) => {
                            const newValue = e.target.value
                            setPersonalInfos({ ...personalInfos, educationLevelId: newValue })
                          }}
                        >
                          <option value=''>Eğitim Durumu Seçin</option>
                          {educationLevels.map((educationLevel) => (
                            <option key={educationLevel.id} value={educationLevel.id}>
                              {educationLevel.educationLevelName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>
                        <span>Son Tamamlanan Eğitim Kurumu</span>
                      </label>
                      <div className='col-lg-8 fv-row'>
                        <input
                          type='text'
                          className='form-control form-control-lg form-control-solid'
                          placeholder='Son Tamamlanan Eğitim Kurumu'
                          value={personalInfos?.lastCompletedEducationalInstitution}
                          onChange={(e) => {
                            setPersonalInfos({
                              ...personalInfos,
                              lastCompletedEducationalInstitution: e.target.value,
                            })
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {role === 'HesapSahibi' && (
                    <div className='card-footer d-flex justify-content-end py-6 px-9'>
                      <button type='submit' className='btn btn-primary'>
                        Kaydet
                      </button>
                    </div>
                  )}
                </form>

                {/* <form className='form' onSubmit={handleSubmit}>
                  <div className='card-body p-9 '>
                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Doğum Tarihi</label>
                      <div className='col-lg-8 fv-row'>
                        <input
                          type='date'
                          className='form-control form-control-lg form-control-solid'
                          name='birthDate'
                          value={
                            personalInfos?.dateOfBirth !== '0001-01-01T00:00:00'
                              ? moment(personalInfos?.dateOfBirth).format('YYYY-MM-DD')
                              : moment().format('YYYY-MM-DD')
                          }
                          onChange={(e) => {
                            setPersonalInfos({
                              ...personalInfos,
                              dateOfBirth:
                                e.target.value !== '0001-01-01T00:00:00'
                                  ? e.target.value
                                  : moment().format('YYYY-MM-DD'),
                            })
                          }}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label  fw-bold fs-6'>Kimlik Numarası</label>
                      <div className='col-lg-8 fv-row'>
                        <input
                          type='text'
                          className='form-control form-control-lg form-control-solid'
                          placeholder={'Kimlik No'}
                          value={personalInfos?.tcKimlikNo}
                          onChange={(e) => {
                            setPersonalInfos({ ...personalInfos, tcKimlikNo: e.target.value })
                            console.log(personalInfos)
                          }}
                          minLength={11}
                          maxLength={11}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Medeni Hal</label>
                      <div className='col-lg-8 fv-row'>
                        <select
                          className='form-select form-select-solid form-select-lg'
                          value={personalInfos?.maritalStatus ? 'married' : 'single'}
                          onChange={(e) => {
                            const newValue = e.target.value
                            const newMaritalStatus = newValue === 'married'
                            setPersonalInfos({ ...personalInfos, maritalStatus: newMaritalStatus })
                            console.log(personalInfos)
                          }}
                        >
                          <option value='single'>Bekar</option>
                          <option value='married'>Evli</option>
                        </select>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Engel Derecesi</label>
                      <div className='col-lg-8 fv-row'>
                        <select className='form-select form-select-solid form-select-lg'>
                          <option value='' disabled selected>
                            Engel Derecesi Seçin
                          </option>
                          <option value='0'>Yok</option>
                          <option value='1'>1. derece</option>
                          <option value='2'>2. derece</option>
                          <option value='3'>3. derece</option>
                        </select>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Uyruğu</label>
                      <div className='col-lg-8 fv-row'>
                        <select
                          className='form-select form-select-solid form-select-lg'
                          value={personalInfos?.nationalityId}
                          onChange={(e) => {
                            const newValue = e.target.value
                            setPersonalInfos({ ...personalInfos, nationalityId: newValue })
                          }}
                        >
                          <option value=''>Uyruk Seçin</option>
                          {nationalities.map((nationality) => (
                            <option key={nationality.id} value={nationality.id}>
                              {nationality.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>
                        <span>Çocuk Sayısı</span>
                      </label>
                      <div className='col-lg-8 fv-row'>
                        <input
                          type='text'
                          className='form-control form-control-lg form-control-solid'
                          placeholder='Çocuk Sayısı'
                          value={personalInfos?.childrenCount}
                          onChange={(e) => {
                            setPersonalInfos({ ...personalInfos, childrenCount: e.target.value })
                          }}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Kan Grubu</label>
                      <div className='col-lg-8 fv-row'>
                        <select
                          className='form-select form-select-solid form-select-lg'
                          value={personalInfos?.bloodGroupId}
                          onChange={(e) => {
                            const newValue = e.target.value
                            setPersonalInfos({ ...personalInfos, bloodGroupId: newValue })
                          }}
                        >
                          <option value=''>Kan Grubu Seçin</option>
                          {bloodGroups.map((bloodGroup) => (
                            <option key={bloodGroup.id} value={bloodGroup.id}>
                              {bloodGroup.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>Eğitim Durumu</label>
                      <div className='col-lg-8 fv-row'>
                        <select
                          className='form-select form-select-solid form-select-lg'
                          value={personalInfos?.educationLevelId}
                          onChange={(e) => {
                            const newValue = e.target.value
                            setPersonalInfos({ ...personalInfos, educationLevelId: newValue })
                          }}
                        >
                          <option value=''>Eğitim Durumu Seçin</option>
                          {educationLevels.map((educationLevel) => (
                            <option key={educationLevel.id} value={educationLevel.id}>
                              {educationLevel.educationLevelName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>
                        <span>Son Tamamlanan Eğitim Kurumu</span>
                      </label>
                      <div className='col-lg-8 fv-row'>
                        <input
                          type='text'
                          className='form-control form-control-lg form-control-solid'
                          placeholder='Son Tamamlanan Eğitim Kurumu'
                          value={personalInfos?.lastCompletedEducationalInstitution}
                          onChange={(e) => {
                            setPersonalInfos({
                              ...personalInfos,
                              lastCompletedEducationalInstitution: e.target.value,
                            })
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {role === 'HesapSahibi' && (
                    <div className='card-footer d-flex justify-content-end py-6 px-9'>
                      <button type='submit' className='btn btn-primary'>
                        Kaydet
                      </button>
                    </div>
                  )}
                </form> */}
              </div>
            </div>

          )
      }

    </>

  )
}

export default EmployeeInfos
