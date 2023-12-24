import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { PageTitle } from '../../../_metronic/layout/core';
import { EmployeesCard } from './components/EmployeesCard/EmployeesCard';
import { useLayout } from '../../../_metronic/layout/core';
import { EmployeesNavbar } from './components/EmployeesNavbar/EmployeesNavbar';
import HttpService from '../../services/HttpService';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Fuse from 'fuse.js';
import { useAuth } from '../../modules/auth';
import { BeatLoader, GridLoader } from 'react-spinners';
import { customJwtDecode } from '../../CustomJwt';
import { useTranslation } from 'react-i18next';


interface DecodedToken {
  CompanyId?: string;
}
export interface Employee {
  id: string;
  profilePicture: string;
  fullName: string;
  phoneNumber: string;
  color?: string;
  email: string;
  isActive: boolean;
  role: string;
}

const Employees: FC<{
  searchText: string, showActiveEmployees: boolean, filteredByRole: string, employees: Employee[]
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
}> = ({ searchText, showActiveEmployees, filteredByRole, employees, setEmployees }) => {


  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const token: any = Cookies.get('authToken');
        const decodedToken: DecodedToken = customJwtDecode(token);
        const companyId = decodedToken.CompanyId;
        if (companyId) {
          const response = await HttpService.get(`User/all/${companyId}`);
          console.log(response.data);
          setEmployees(response.data);
          setLoading(false);
        } else {
          console.log('CompanyId not found in token.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  // const filteredEmployees = employees.filter((employee) =>
  //   employee.fullName.toLowerCase().includes(searchText.toLowerCase())
  // );



  const filteredEmployees = employees.filter((employee) => {

    const fuse = new Fuse(employees, {
      keys: ['fullName'],
      threshold: 0.2
    }
    );
    const results = fuse.search(searchText);
    return results.find((result) => result.item.id === employee.id);
  });


  const displayedEmployees = filteredEmployees.filter((employee) => {
    const isActive = showActiveEmployees ? employee.isActive : !employee.isActive;
    return isActive && (filteredByRole === 'All' || employee.role === filteredByRole);
  });

  const displayedNoneFilteredEmployees = employees.filter((employee) => {
    const isActive = showActiveEmployees ? employee.isActive : !employee.isActive;
    return isActive && (filteredByRole === 'All' || employee.role === filteredByRole);
  });


  return (
    <>
      {
        loading ? (
          <div className='d-flex justify-content-center' >
            <BeatLoader color='#0095e8' loading={loading} size={20} />
          </div >
        ) : (
          <div className='row g-6 g-xl-9'>
            {searchText !== '' ? (
              displayedEmployees.map((employee, index) => (
                <div key={index} className='col-md-6 col-xxl-4'>

                  <EmployeesCard
                    id={employee.id}
                    profilePicture={employee.profilePicture}
                    fullName={employee.fullName}
                    number={employee.phoneNumber}
                    color={employee.color}
                    email={employee.email}
                    isActive={employee.isActive}
                    role={employee.role}
                  />
                </div>
              ))
            ) : (
              displayedNoneFilteredEmployees.map((employee, index) => (
                <div key={index} className='col-md-6 col-xxl-4'>
                  <EmployeesCard
                    id={employee.id}
                    profilePicture={employee.profilePicture}
                    fullName={employee.fullName}
                    number={employee.phoneNumber}
                    color={employee.color}
                    email={employee.email}
                    isActive={employee.isActive}
                    role={employee.role}

                  />
                </div>
              ))
            )}
          </div>
        )
      }

    </>


  );

};

const EmployeesPage: FC = () => {
  const [searchText, setSearchText] = useState('');
  const [showActiveEmployees, setShowActiveEmployees] = useState<boolean>(true);
  const [filteredByRole, setFilteredByRole] = useState<string>('All');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { t } = useTranslation();
  return (
    <>
      <PageTitle breadcrumbs={[]}>{t('MENU.EMPLOYEES')}</PageTitle>
      <EmployeesNavbar
        setSearchText={setSearchText}
        showActiveEmployees={showActiveEmployees}
        setShowActiveEmployees={setShowActiveEmployees}
        filteredByRole={filteredByRole}
        setFilteredByRole={setFilteredByRole}
        employees={employees}
        setEmployees={setEmployees}
      />
      <Employees searchText={searchText} showActiveEmployees={showActiveEmployees}
        filteredByRole={filteredByRole} employees={employees}
        setEmployees={setEmployees} />
    </>
  );
};

export default EmployeesPage;
