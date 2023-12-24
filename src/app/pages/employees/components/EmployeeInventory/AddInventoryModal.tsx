import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import HttpService from '../../../../services/HttpService';
import { DateTime } from 'luxon';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import EmployeeInventory from './EmployeeInventory';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

type AddInventoryModalProps = {
  show: boolean;
  handleClose: () => void;
};

interface DecodedToken {
  CompanyId?: string;
}

interface InventoryModal {
  dateOfIssue: string | null;
  refundDate: string | null;
  serialNumber: string | null;
  userBusinessInfoId: string | null;
  inventoryCategoryId: string | null;
  description: string | null;
}

const modalsRoot = document.getElementById('root-modals') || document.body;

const AddInventoryModal: React.FC<AddInventoryModalProps> = ({
  show,
  handleClose,
}) => {


  const { id: userId } = useParams();

  const [modalInventoryData, setModalInventoryData] =
    useState<InventoryModal>({
      dateOfIssue: null,
      refundDate: null,
      serialNumber: null,
      userBusinessInfoId: userId || null,
      inventoryCategoryId: null,
      description: null,
    });

  const [inventoryCategories, setInventoryCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchInventoryCategoryName();
  }, []);

  const fetchInventoryCategoryName = () => {
    const token: any = Cookies.get('authToken');
    const decodedToken: DecodedToken = jwtDecode(token);
    const companyId = decodedToken.CompanyId;
    HttpService.get(
      `InventoryCategory/all/${companyId}`, Cookies.get("authToken")
    ).then((response) => {
      setInventoryCategories(response.data);
      console.log(response.data)
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await HttpService.post(
      `Inventory/create/${userId}`,
      modalInventoryData, Cookies.get("authToken")
    ).then((response) => {
      console.log(response);
      setLoading(false);
      handleClose();
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });

  };

  const [loading, setLoading] = useState<boolean>(false);

  return createPortal(
    <Modal
      id='add_inventory_modal'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-700px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>Envanter Ekle</h2>
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <form>
          <div className='row g-5'>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label>Kategori</label>
                <select
                  className='form-select form-select-solid form-select-lg'
                  onChange={(e) => {
                    setModalInventoryData({
                      ...modalInventoryData,
                      inventoryCategoryId: e.target.value,
                    })
                    console.log(e.target.value)
                  }
                  }
                >
                  <option value='' selected>Seçiniz</option>
                  {inventoryCategories.map((inventoryCategory) => (
                    <option key={inventoryCategory.id} value={inventoryCategory.id}>
                      {inventoryCategory.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-5'>
                <label>Seri Numarası</label>
                <input
                  type='text'
                  className='form-control form-control-lg'

                  value={modalInventoryData.serialNumber ?? ''}
                  onChange={(e) =>
                    setModalInventoryData({
                      ...modalInventoryData,
                      serialNumber: e.target.value
                    })
                  }
                />
              </div>
            </div>


            <div className='col-md-6'>
              <div className='mb-5'>
                <label>Teslim Tarihi</label>
                <input
                  type='date'
                  className='form-control form-control-lg'
                  value={moment(modalInventoryData.dateOfIssue).format('YYYY-MM-DD')}
                  onChange={(e) =>
                    setModalInventoryData({
                      ...modalInventoryData,
                      dateOfIssue: e.target.value
                    })
                  }
                />
              </div>
            </div>

            <div className='col-md-6'>
              <div className='mb-5'>
                <label>İade Tarihi</label>
                <input
                  type='date'
                  className='form-control form-control-lg'
                  value={moment(modalInventoryData.refundDate).format('YYYY-MM-DD')}
                  onChange={(e) =>
                    setModalInventoryData({
                      ...modalInventoryData,
                      refundDate: e.target.value,
                    })

                  }
                />
              </div>
            </div>

            <div className='col-md-12'>
              <div className='mb-5'>
                <label>Açıklama</label>
                <textarea
                  className='form-control form-control-lg'
                  rows={3}
                  value={modalInventoryData.description ?? ''}
                  onChange={(e) =>
                    setModalInventoryData({
                      ...modalInventoryData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className='modal-footer'>
        <button type='button' className='btn btn-danger me-3' onClick={handleClose}>
          İptal
        </button>



        <button type='button' className='btn btn-primary' disabled={loading} onClick={handleSubmit}>
          {loading ? (
            <span>
              Oluşturuluyor... <i className="spinner-border spinner-border-sm ms-2"></i>
            </span>
          ) : (
            'Oluştur'
          )}
        </button>
      </div>
    </Modal>,
    modalsRoot
  );
};

export default AddInventoryModal;

