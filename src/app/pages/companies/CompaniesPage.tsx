import { useState, FC, useEffect } from 'react'
import HttpService from '../../services/HttpService'
import { CompanyCard } from './components/CompanyCard/CompanyCard'
import { BeatLoader } from 'react-spinners'
export interface Company {
  name: string;
  phoneNumber: string;
  email: string;
  logo: string;
  id: any;
  isDeleted: boolean;
}

const Companies: FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<Company[]>([]);


  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await HttpService.get('Companies/getall');
        setCompanies(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);


  return (


    <>
      {
        loading ? (
          <div className='d-flex justify-content-center' >
            <BeatLoader color='#0095e8' loading={loading} size={20} />
          </div >

        ) :
          (
            <div className='row g-6 g-xl-9'>
              {companies.map((company, index) => (
                <div key={index} className='col-md-6 col-xxl-4'>
                  <CompanyCard {...company} companies={companies} setCompanies={setCompanies} />
                </div>
              ))}
            </div>
          )
      }
    </>

  );
};


const CompaniesPage: FC = () => {
  return (
    <>
      <Companies />
    </>
  );
};

export default CompaniesPage;
