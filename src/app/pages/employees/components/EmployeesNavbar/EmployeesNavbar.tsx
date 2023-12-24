import React, { useTransition } from 'react';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../../../_metronic/helpers/components/KTSVG';
import { TextField } from '@material-ui/core';
import { FaDownload, FaPlus } from 'react-icons/fa';
import { DropdownEmployees } from '../DropdownEmployees/DropdownEmployees'
import { useState } from 'react';
import { CreateEmployeeModal } from '../CreateEmployeeModal/CreateEmployeeModal';
import { CreateEmployeeExcelModal } from '../CreateEmployeeExcelModal/CreateEmployeeExcelModal';
import { useEffect } from 'react';
import HttpService from '../../../../services/HttpService';
import { Employee } from '../../EmployeesPage';
import { useTranslation } from 'react-i18next';

interface EmployeesNavbarProps {
    setSearchText: (text: string) => void;
    showActiveEmployees: boolean;
    setShowActiveEmployees: (showActiveEmployees: boolean) => void;
    filteredByRole: string;
    setFilteredByRole: (filteredByRole: string) => void;
    employees: Employee[]
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
}



export function EmployeesNavbar({ setSearchText, showActiveEmployees, setShowActiveEmployees, filteredByRole, setFilteredByRole, employees, setEmployees }: EmployeesNavbarProps) {
    const { t } = useTranslation();
    const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
    const [showExcelModal, setShowExcelModal] = useState<boolean>(false)
    const handleSearchBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const [role, setRole] = useState<any>(null)


    useEffect(() => {
        HttpService.get('Auth/role').then((res) => {
            console.log(res.data)
            setRole(res.data)
        })

    }, [])

    const handleRoleChange = (roleName: string) => {
        console.log(roleName)
        setFilteredByRole(roleName)
    }



    return (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <div className='card-header d-flex align-items-center justify-content-between'>
                {/* Search Bar */}
                <div className='d-flex align-items-center'>
                    <TextField id='standard-basic' label='Çalışan Ara' variant='standard' onChange={handleSearchBarChange} />
                </div>

                {/* Buttons (Filter Button and Add Employee Button) */}
                <div className='d-flex align-items-center'>
                    {/* Filter Button */}
                    <div className='card-filter me-4'>
                        <a className='btn btn-flex  btn-light-primary' data-kt-menu-trigger='click'>
                            <KTSVG
                                path='/media/icons/duotune/general/gen017.svg'
                                className='svg-icon-6 svg-icon-muted me-1'
                            />
                            {t('EMPLOYEES.PAGE.NAVBAR.UNITS')}
                        </a>
                        <DropdownEmployees
                            employees={employees}
                            setEmployees={setEmployees}
                        />
                    </div>


                    {/* Role Filter Button */}
                    <div className='card-filter me-4'>
                        <select
                            className='form-select form-select-solid text-primary bg-light-primary cursor-pointer'
                            onChange={(event) => handleRoleChange(event.target.value)}
                            value={role ? role.roleName : ''}
                        >
                            <option value='All' className='text-dark'>Role Göre</option>
                            {role &&
                                role.map((roleItem: any) => (
                                    <option key={roleItem.id} value={roleItem.roleName} className='text-dark'>
                                        {roleItem.roleName}
                                    </option>
                                ))}
                        </select>
                    </div>


                    {/* Filter Dropdown */}
                    <div className='card-filter me-4'>
                        <select
                            className='form-select form-select-solid text-primary bg-light-primary cursor-pointer'
                            onChange={(event) => {
                                const newValue = event.target.value === '1';
                                setShowActiveEmployees(newValue);
                            }}
                            value={showActiveEmployees ? '1' : '2'}
                        >
                            <option value='1' className='text-dark'>
                                Aktif Çalışanlar
                            </option>
                            <option value='2' className='text-dark'>
                                Eski Çalışanlar
                            </option>
                        </select>
                    </div>








                    {/* Filter Button */}
                    <div className='card-filter me-4'>
                        <a className='btn btn-flex  btn-light-primary' data-kt-menu-trigger='click' onClick={() => setShowExcelModal(true)}>
                            <FaDownload />
                            &nbsp;
                            Excel İle Ekle
                        </a>
                        <CreateEmployeeExcelModal show={showExcelModal} handleClose={() => setShowExcelModal(false)} />
                    </div>


                    {/* Add Employee Button */}
                    <button className='btn btn-primary fw-bold' onClick={() => setShowCreateAppModal(true)}>
                        <FaPlus />
                        &nbsp;
                        {t('EMPLOYEES.PAGE.NAVBAR.ADD.EMPLOYEE')}
                    </button>
                    <CreateEmployeeModal show={showCreateAppModal} handleClose={() => setShowCreateAppModal(false)} />

                </div>
            </div>
        </div>
    );
}
