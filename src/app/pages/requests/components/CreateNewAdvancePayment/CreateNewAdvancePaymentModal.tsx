import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useAuth } from '../../../../modules/auth';
import HttpService from '../../../../services/HttpService';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../../actions/notificationAction';

interface IAdvancePaymentRequest {
  amount: number,
  description?: string;
  deliveryDate: Date;
  userId: string | undefined;
}

type Props = {
  show: boolean;
  handleClose: () => void;
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const CreateNewAdvancePaymentModal = ({ show, handleClose }: Props) => {
  const [requestData, setRequestData] = useState<IAdvancePaymentRequest>({
    amount: 0,
    description: '',
    deliveryDate: new Date(),
    userId: ''
  });

  const updateAdvanceRequestData = (fieldsToUpdate: Partial<IAdvancePaymentRequest>) => {
    const updatedData = { ...requestData, ...fieldsToUpdate };
    setRequestData(updatedData);
  };

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleCreateEmployee = () => {
    requestData.userId = currentUser?.id;

    HttpService.post('AdvanceRequest/create', requestData, Cookies.get("authToken"))
      .then((res) => {
        console.log(res.data)
        dispatch(showNotification({
          type: 'success',
          message: t(`MESSAGES.SUCCESSES.CREATE.ADVANCEREQUEST.SAdvanceC01`)
        }))
        navigate(`/employees/profile/${currentUser?.id}/payment/infos`);
        handleClose();
      }).catch((err) => {
        const code = err.response.data.statusCode;
        if (code === 400) {

        } else if (code === 404) {
          dispatch(showNotification({
            type: 'warning',
            message: t(`MESSAGES.WARNINGS.CREATE.ADVANCEREQUEST.${err.response.data.errorCode}`)
          }))
        } else {

        }

        console.log(err.response.data)
      })

  };

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
        <h2>{t("REQUESTPADVANCE.PAGE.CREATE.PERMISSION.TITLE")}</h2>

      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <form noValidate id='create_employee_form'>
          <div className='row g-5'>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>{t("REQUESTPADVANCE.PAGE.CREATE.PERMISSION.AMOUNT")}</label>
                <input
                  type='number'
                  className='form-control'
                  name='Amount'
                  value={requestData.amount}
                  onChange={(e) => updateAdvanceRequestData({ amount: e.target.valueAsNumber })}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>{t("REQUESTPADVANCE.PAGE.CREATE.PERMISSION.DESCRIP")}</label>
                <input
                  type='text'
                  className='form-control'
                  name='Description'
                  value={requestData.description?.toString()}
                  onChange={(e) => updateAdvanceRequestData({ description: e.target.value })}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label className='form-label'>{t("REQUESTPADVANCE.PAGE.CREATE.PERMISSION.DELIVERYDATE")}</label>
                <input
                  type='date'
                  className='form-control'
                  name='DeliveryDate'
                  value={moment(requestData.deliveryDate).format('YYYY-MM-DD')}
                  onChange={(e) => {
                    const newDeliveryDate = moment(e.target.value, 'YYYY-MM-DD');
                    updateAdvanceRequestData({ deliveryDate: newDeliveryDate.toDate() });
                  }}
                />
              </div>
            </div>
          </div>



          <div className='d-flex justify-content-end mt-5'>
            <button type='button' className='btn btn-danger me-3' onClick={handleClose}>
              İptal
            </button>
            <button type='button' className='btn btn-primary' onClick={handleCreateEmployee} >
              Avans Talebini Oluştur
            </button>
          </div>
        </form>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateNewAdvancePaymentModal };
