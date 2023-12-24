import { StepProps } from './ICompanyModel'
import { useEffect } from 'react'
import HttpService from '../../../../../services/HttpService'
import { useState } from 'react'
const Step2Address = ({ data, updateData, hasError }: StepProps) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HttpService.get('Countries/all');
        setCountries(response.data); // Ülkeleri state'e atama
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');



  const handleCountryChange = (event: any) => {
    setSelectedCountry(event.target.value); // Seçilen ülkeyi state'e atama
    const fetchData = async () => {
      try {
        const response = await HttpService.get(`Cities/getbycountryid/${event.target.value}`);
        setCities(response.data); // Şehirleri state'e atama
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();


    updateData({
      companyAddress: {
        postCode: data.companyAddress.postCode,
        address: data.companyAddress.address,
        countryId: event.target.value,
        cityId: data.companyAddress.cityId,
      }

    })

    
  };

  const handleCityChange = (event: any) => {
    setSelectedCity(event.target.value);


    updateData({
      companyAddress: {
        postCode: data.companyAddress.postCode,
        address: data.companyAddress.address,
        countryId: data.companyAddress.countryId,
        cityId: event.target.value,
      }

    })
  };

  return (
    <div data-kt-stepper-element='content'>
      <div className='w-100'>
        {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Şirket Adresi</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='appname'
            placeholder=''
            onChange={(e) =>
              updateData({
                companyAddress: {
                  postCode: data.companyAddress.postCode,
                  address: e.target.value,
                  countryId: data.companyAddress.countryId,
                  cityId: data.companyAddress.cityId,
                }
              })
            }
          />
          {!data.companyAddress.address && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                Company address is required
              </div>
            </div>
          )}
        </div>
        {/*end::Form Group */}




        {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Şirket Posta Kodu</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='postCode'
            placeholder=''
            value={data.companyAddress.postCode}
            onChange={(e) =>
              updateData({
                companyAddress: {
                  postCode: e.target.value,
                  address: data.companyAddress.address,
                  countryId: data.companyAddress.countryId,
                  cityId: data.companyAddress.cityId,
                }

              })
            }
          />
          {!data.companyAddress.postCode && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='email' data-validator='notEmpty' className='fv-help-block'>
                Company Post Code is required
              </div>
            </div>
          )}
        </div>
        {/*end::Form Group */}


        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Şirket Ülke </span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className='form-select form-select-lg form-select-solid'
          >
            <option value=''>Select Country</option>
            {countries.map((country: any) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>

          {!data.companyAddress.countryId && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='phoneNumber' data-validator='notEmpty' className='fv-help-block'>
                Company country is required
              </div>
            </div>
          )}
        </div>

        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Şirket Şehir </span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>

          {cities.length >= 0 && (
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className='form-select form-select-lg form-select-solid'
            >
              <option value=''>Select City</option>
              {cities.map((city: any) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          )}


          {!data.companyAddress.cityId && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='logo' data-validator='notEmpty' className='fv-help-block'>
                Company city is required
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export { Step2Address }
