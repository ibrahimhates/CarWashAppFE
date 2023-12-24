import React, {useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {useState} from 'react'
import HttpService from '../../../../services/HttpService'
import {useParams} from 'react-router-dom'
import {BeatLoader} from 'react-spinners'

interface EmployeeAddressInfos {
  userId?: string
  addressDescription: string
  countryId: string
  cityId: string
  postalCode: string
  homePhone: string
}

interface EmployeeEmergencyInfos {
  nameSurname: string
  phone: string
  closeness: string
}

interface EmployeeBankInfos {
  userId?: string
  name: string
  iban: string
  accountNumber: string
}

type Props = {
  role: string
}

function EmployeeOtherInfos({role}: Props) {
  const [addressCollapsed, setAddressCollapsed] = useState(false)
  const [bankCollapsed, setBankCollapsed] = useState(false)
  const [emergencyCollapsed, setEmergencyCollapsed] = useState(false)
  const [socialMediaCollapsed, setSocialMediaCollapsed] = useState(false)
  const {id} = useParams()

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')

  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')

  const [loading, setLoading] = useState<boolean>(false)

  const [employeeBankInfos, setEmployeeBankInfos] = useState<EmployeeBankInfos>({
    name: '',
    iban: '',
    accountNumber: '',
  })

  const fetchCountries = async () => {
    try {
      const response = await HttpService.get('Countries/all')
      setCountries(response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchCitiesByCountryId = async (id: any) => {
    try {
      const response = await HttpService.get(`Cities/getbycountryid/${id}`)
      setCities(response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchCities = async () => {
    try {
      const response = await HttpService.get('Cities/all')
      setCities(response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchBankInfos = async () => {
    try {
      const response = await HttpService.get(`User/profile/bankInfos/${id}`)
      setEmployeeBankInfos(response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const [employeeAddressInfos, setEmployeeAddressInfos] = useState<EmployeeAddressInfos>({
    addressDescription: '',
    countryId: '',
    cityId: '',
    postalCode: '',
    homePhone: '',
  })

  const [employeeEmergencyInfos, setEmployeeEmergencyInfos] = useState<EmployeeEmergencyInfos>({
    closeness: '',
    nameSurname: '',
    phone: '',
  })

  const fetchEmergencyInfos = () => {
    HttpService.get(`User/profile/emergencyInfos/${id}`)
      .then((res) => {
        setEmployeeEmergencyInfos(res.data)
      })
      .catch((e) => console.log(e))
  }

  const fetchData = async () => {
    try {
      const response = await HttpService.get(`User/profile/addressInfos/${id}`)
      setEmployeeAddressInfos(response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await fetchCities()
        await fetchCountries()
        await fetchBankInfos()
        fetchEmergencyInfos()
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleAddressCollapse = () => {
    setAddressCollapsed(!addressCollapsed)
  }

  const toggleBankCollapse = () => {
    setBankCollapsed(!bankCollapsed)
  }

  const toggleEmergencyCollapse = () => {
    setEmergencyCollapsed(!emergencyCollapsed)
  }

  const toggleSocialMediaCollapse = () => {
    setSocialMediaCollapsed(!socialMediaCollapsed)
  }

  const handleSubmitAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (employeeAddressInfos) {
      try {
        employeeAddressInfos.userId = id
        HttpService.put(`User/profile/addressInfos/update`, employeeAddressInfos).then(() => {
          console.log('submitted successfully')
        })
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  const handleBankInfosSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (employeeBankInfos) {
      try {
        employeeBankInfos.userId = id
        HttpService.put(`User/profile/bankInfos/update`, employeeBankInfos).then(() => {
          console.log('submitted successfully')
        })
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  const handleEmergencySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (employeeEmergencyInfos) {
      var data = {
        closeness: employeeEmergencyInfos.closeness,
        nameSurname: employeeEmergencyInfos.nameSurname,
        phone: employeeEmergencyInfos.phone,
        userId: id,
      }

      HttpService.put(`User/profile/emergencyInfos/update`, data)
        .then((res) => {
          console.log(res)
        })
        .catch((e) => console.log(e))
    }
  }

  return (
    <>
      {loading ? (
        <div className='d-flex justify-content-center'>
          <BeatLoader color='#0095e8' loading={loading} size={20} />
        </div>
      ) : (
        <>
          <div className='card mb-5 mb-xl-10'>
            <div
              className='card-header border-0 cursor-pointer'
              role='button'
              onClick={toggleAddressCollapse}
              aria-expanded={!addressCollapsed}
              aria-controls='kt_account_profile_details'
            >
              <div className='card-title m-0'>
                <h3 className='fw-bolder m-0'>Adres Bilgileri</h3>
              </div>
            </div>

            <div
              id='kt_account_profile_details'
              className={`collapse ${addressCollapsed ? '' : 'show'}`}
            >
              <form className='form' onSubmit={handleSubmitAddress}>
                <div className='card-body border-top p-9 '>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label  fw-bold fs-6'>Adres Bilgileri</label>

                    <div className='col-lg-8 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        placeholder='Adres Bilgileri'
                        value={employeeAddressInfos.addressDescription}
                        onChange={(e) =>
                          setEmployeeAddressInfos({
                            ...employeeAddressInfos,
                            addressDescription: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label  fw-bold fs-6'>Ev Telefonu</label>

                    <div className='col-lg-8 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        value={employeeAddressInfos.homePhone}
                        onChange={(e) =>
                          setEmployeeAddressInfos({
                            ...employeeAddressInfos,
                            homePhone: e.target.value,
                          })
                        }
                        placeholder='Ev Telefonu'
                      />
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>Ülke</label>
                    <div className='col-lg-8 fv-row'>
                      <select
                        className='form-select form-select-solid form-select-lg'
                        value={employeeAddressInfos.countryId}
                        onChange={(e) => {
                          setSelectedCountry(e.target.value)
                          setEmployeeAddressInfos({
                            ...employeeAddressInfos,
                            countryId: e.target.value,
                          })
                          const countryId = e.target.value
                          fetchCitiesByCountryId(countryId)
                        }}
                      >
                        <option value=''>Ülke Seçiniz</option>
                        {countries.map((country: any) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label  fw-bold fs-6'>Şehir</label>

                    <div className='col-lg-8 fv-row'>
                      <select
                        className='form-select form-select-solid form-select-lg'
                        value={employeeAddressInfos.cityId}
                        onChange={(e) => {
                          setSelectedCity(e.target.value)
                          setEmployeeAddressInfos({...employeeAddressInfos, cityId: e.target.value})
                        }}
                      >
                        <option value=''>Şehir Seçiniz</option>
                        {cities.map((city: any) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label  fw-bold fs-6'>Posta Kodu</label>

                    <div className='col-lg-8 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        placeholder='Posta Kodu'
                        value={employeeAddressInfos.postalCode}
                        onChange={(e) =>
                          setEmployeeAddressInfos({
                            ...employeeAddressInfos,
                            postalCode: e.target.value,
                          })
                        }
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
            </div>
          </div>

          <div className='card mb-5 mb-xl-10'>
            <div
              className='card-header border-0 cursor-pointer'
              role='button'
              onClick={toggleBankCollapse}
              aria-expanded={!bankCollapsed}
              aria-controls='kt_account_bank_details'
            >
              <div className='card-title m-0'>
                <h3 className='fw-bolder m-0'>Banka Bilgileri</h3>
              </div>
            </div>

            <div id='kt_account_bank_details' className={`collapse ${bankCollapsed ? '' : 'show'}`}>
              <form className='form' onSubmit={handleBankInfosSubmit}>
                <div className='card-body border-top p-9 '>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label  fw-bold fs-6'>Banka Adı</label>

                    <div className='col-lg-8 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        placeholder='Banka Adı'
                        value={employeeBankInfos.name}
                        onChange={(e) =>
                          setEmployeeBankInfos({...employeeBankInfos, name: e.target.value})
                        }
                      />
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label  fw-bold fs-6'>Hesap No</label>

                    <div className='col-lg-8 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        placeholder='Hesap No'
                        value={employeeBankInfos.accountNumber}
                        onChange={(e) =>
                          setEmployeeBankInfos({
                            ...employeeBankInfos,
                            accountNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label  fw-bold fs-6'>IBAN</label>

                    <div className='col-lg-8 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        placeholder='IBAN'
                        value={employeeBankInfos.iban}
                        onChange={(e) =>
                          setEmployeeBankInfos({...employeeBankInfos, iban: e.target.value})
                        }
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
            </div>
          </div>
        </>
      )}

      <div className='card mb-5 mb-xl-10'>
        <div
          className='card-header border-0 cursor-pointer'
          role='button'
          onClick={toggleBankCollapse}
          aria-expanded={!bankCollapsed}
          aria-controls='kt_account_bank_details'
        >
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Acil Durum Bilgileri</h3>
          </div>
        </div>

        <div id='kt_account_bank_details' className={`collapse ${bankCollapsed ? '' : 'show'}`}>
          <form noValidate className='form' onSubmit={handleEmergencySubmit}>
            <div className='card-body border-top p-9 '>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label  fw-bold fs-6'>
                  Aranacak Kişi Ad Soyad
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Ad Soyad'
                    value={employeeEmergencyInfos.nameSurname}
                    onChange={(e) =>
                      setEmployeeEmergencyInfos({
                        ...employeeEmergencyInfos,
                        nameSurname: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label  fw-bold fs-6'>
                  Aranacak Kişi Telefon
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Telefon Numarası'
                    value={employeeEmergencyInfos.phone}
                    onChange={(e) =>
                      setEmployeeEmergencyInfos({
                        ...employeeEmergencyInfos,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label  fw-bold fs-6'>
                  Aranacak Kişi Yakınlık Derecesi
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Yakınlık Derecesi'
                    value={employeeEmergencyInfos.closeness}
                    onChange={(e) =>
                      setEmployeeEmergencyInfos({
                        ...employeeEmergencyInfos,
                        closeness: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button type='submit' className='btn btn-primary'>
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 


            <div className='card mb-5 mb-xl-10'>
                <div
                    className='card-header border-0 cursor-pointer'
                    role='button'
                    onClick={toggleSocialMediaCollapse}
                    aria-expanded={!socialMediaCollapsed}
                    aria-controls='kt_account_social_media'
                >
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Bağlantılar ve Sosyal Medya Hesapları</h3>
                    </div>
                </div>

                <div
                    id='kt_account_social_media'
                    className={`collapse ${socialMediaCollapsed ? '' : 'show'}`}
                >
                    <form noValidate className='form'>
                        <div className='card-body border-top p-9'>
                            <div className='row mb-6'>
                                <label className='col-lg-4 col-form-label  fw-bold fs-6'>
                                    Bağlantı Adresi
                                </label>

                                <div className='col-lg-8 fv-row'>
                                    <input
                                        type='text'
                                        className='form-control form-control-lg form-control-solid'
                                        placeholder='Bağlantı Adresi'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='card-footer d-flex justify-content-end py-6 px-9'>
                            <button type='submit' className='btn btn-primary'>
                                Kaydet
                            </button>
                        </div>
                    </form>
                </div>
            </div> */}
    </>
  )
}

export default EmployeeOtherInfos
