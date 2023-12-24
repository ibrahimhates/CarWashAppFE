import { ReactHTML, useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import HttpService from '../../../../services/HttpService';
import moment from 'moment/moment';
import Cookies from 'js-cookie';
import { toAbsoluteUrl } from '../../../../../_metronic/helpers';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../../actions/notificationAction';
import { useTranslation } from 'react-i18next';

interface IEmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  businessPhoneNumber: string;
  phoneNumber: string;
  startedDate: any;
  roleId: string;
  contractIndefinite: boolean;
  contractEndDate: any;
  profilePicture?: any;
}

type Props = {
  show: boolean;
  handleClose: () => void;
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const CreateEmployeeModal = ({ show, handleClose }: Props) => {


  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch()

  const [employeeData, setEmployeeData] = useState<IEmployeeData>({
    firstName: '',
    lastName: '',
    email: '',
    businessPhoneNumber: '',
    phoneNumber: '',
    startedDate: '',
    roleId: '',
    contractIndefinite: false,
    contractEndDate: '',
    profilePicture: null
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const updateEmployeeData = (fieldsToUpdate: Partial<IEmployeeData>) => {
    const updatedData = { ...employeeData, ...fieldsToUpdate };
    setEmployeeData(updatedData);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setProfilePicture(file);

      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target?.result;
        if (typeof imageData === 'string') {
          const base64ImageData = imageData.split(',')[1];
          updateEmployeeData({ profilePicture: base64ImageData });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const [sendNotification, setSendNotification] = useState(false);

  const handleToggleNotification = () => {
    setSendNotification((prev) => !prev);
  };

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HttpService.get('Auth/role');
        setRoles(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handleCreateEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(employeeData);
    setLoading(true)

    HttpService.post('Auth/register', employeeData, Cookies.get("authToken"))
      .then((res) => {
        console.log(res);
        const employeeId = res.data.id;
        return employeeId;
      })
      .then((employeeId) => {
        navigate(`/employees/profile/${employeeId}/detail`);
        dispatch(showNotification({ type: "success", message: "Çalışan başarıyla oluşturuldu." }));

      })
      .catch((err) => {
        dispatch(showNotification({ type: "error", message: "Çalışan oluşturulamadı." }));
        console.log(err);
      });
    setLoading(false)

  };

  const { t } = useTranslation();

  return createPortal(
    <Modal
      id='create_employee_modal'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-700px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>{t("EMPLOYEES.PAGE.CREATE.EMPLOYEE.TITLE")}</h2>
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <form id='create_employee_form' onSubmit={handleCreateEmployee}>
          <div className='row g-5'>
            <div className='col-md-12'>
              <div className='mb-5'>
                <label className='image-input image-input-outline cursor-pointer'>
                  <div
                    className='image-input-wrapper w-125px h-125px'
                    style={{
                      backgroundColor: '#EBEDF4',
                      backgroundImage: profilePicture
                        ? `url(${URL.createObjectURL(profilePicture)})`
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
              </div>
            </div>


            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>{t("EMPLOYEES.PAGE.CREATE.EMPLOYEE.NAME")}</label>
                <input
                  type='text'
                  className='form-control required'
                  name='firstName'
                  required
                  value={employeeData.firstName}
                  onChange={(e) => updateEmployeeData({ firstName: e.target.value })}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>{t("EMPLOYEES.PAGE.CREATE.EMPLOYEE.SURNAME")}</label>
                <input
                  type='text'
                  className='form-control required'
                  name='lastName'
                  value={employeeData.lastName}
                  onChange={(e) => updateEmployeeData({ lastName: e.target.value })}
                />
              </div>
            </div>

            <div className='col-md-12'>
              <div className='mb-5'>
                <label className='form-label'>{t("EMPLOYEES.PAGE.CREATE.EMPLOYEE.EMAIL_WORK")}</label>
                <i
                  className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Kullanıcının giriş yapacağı e-posta adresi'
                ></i>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  value={employeeData.email}
                  onChange={(e) => updateEmployeeData({ email: e.target.value })}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>{t("EMPLOYEES.PAGE.CREATE.EMPLOYEE.PHONE_PERSONAL")}</label>
                <input
                  type='text'
                  className='form-control'
                  name='phoneNumber'
                  maxLength={11}
                  value={employeeData.phoneNumber}
                  onChange={(e) => updateEmployeeData({ phoneNumber: e.target.value })}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>{t("EMPLOYEES.PAGE.CREATE.EMPLOYEE.PHONE_WORK")}</label>
                <input
                  type='text'
                  className='form-control'
                  name='businessPhoneNumber'
                  maxLength={11}
                  minLength={11}
                  value={employeeData.businessPhoneNumber}
                  onChange={(e) => updateEmployeeData({ businessPhoneNumber: e.target.value })}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>{t("EMPLOYEES.PAGE.CREATE.EMPLOYEE.START_DATE")}</label>
                <input
                  type='date'
                  className='form-control'
                  name='startedDate'
                  value={moment(employeeData.startedDate).format('YYYY-MM-DD')}
                  onChange={(e) => {
                    const newstartedDate = moment(e.target.value, 'YYYY-MM-DD');
                    updateEmployeeData({ startedDate: newstartedDate });
                  }}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>{t("EMPLOYEES.PAGE.CREATE.EMPLOYEE.ACCESS_TYPE")}</label>
                <select
                  className='form-select'
                  name='roleId'
                  value={employeeData.roleId}
                  onChange={(e) => updateEmployeeData({ roleId: e.target.value })}
                >
                  <option value=''>Çalışan Rolü Seçiniz</option>
                  {roles.map((role: any) => (
                    <option key={role.id} value={role.id}>
                      {role.roleName}
                    </option>
                  ))}
                </select>

              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>{t("EMPLOYEES.PAGE.CREATE.EMPLOYEE.CONTRACT_TYPE")}</label>
                <select
                  className='form-select'
                  name='contractIndefinite'
                  onChange={(e) => updateEmployeeData({ contractIndefinite: e.target.value === 'limited' ? true : false })}
                >
                  <option value=''>Sözleşme türü seçin</option>
                  <option value='limited'>Süreli</option>
                  <option value='unlimited'>Süresiz</option>
                </select>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>{t("EMPLOYEES.PAGE.CREATE.EMPLOYEE.CONTRACT_END_DATE")}</label>
                <input
                  type='date'
                  className='form-control'
                  name='contractEndDate'
                  value={moment(employeeData.contractEndDate).format('YYYY-MM-DD')}
                  onChange={(e) => {
                    const newstartedDate = moment(e.target.value, 'YYYY-MM-DD');
                    updateEmployeeData({ contractEndDate: newstartedDate });
                  }}
                  readOnly={!employeeData.contractIndefinite}
                />
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
              <div className='form-check form-switch form-check-custom form-check-solid'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='toggleNotification'
                  checked={sendNotification}
                  onChange={handleToggleNotification}
                />
                <label className='form-check-label' htmlFor='toggleNotification'>
                  {t("EMPLOYEES.PAGE.SEND.EMAIL")}
                </label>
              </div>
            </div>

            <div className='d-flex justify-content-end'>
              <button type='button' className='btn btn-danger me-3' onClick={handleClose}>
                İptal Et
              </button>
              <button type='submit' className='btn btn-primary' disabled={loading} >
                {loading ? (
                  <span>
                    Oluşturuluyor... <i className="spinner-border spinner-border-sm ms-2"></i>
                  </span>
                ) : (
                  'Oluştur'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateEmployeeModal };
