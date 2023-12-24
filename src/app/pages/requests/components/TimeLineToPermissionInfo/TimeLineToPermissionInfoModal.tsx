import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { KTSVG } from '../../../../../_metronic/helpers';
import { useNavigate } from 'react-router-dom';
import { Dropdown1 } from '../../../../../_metronic/partials';
import { useTranslation } from 'react-i18next';

type Props = {
  show: boolean;
  handleClose: () => void;
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const TimeLineToPermissionInfoModal = ({ show, handleClose }: Props) => {

  const navigate = useNavigate();

  const [sendNotification, setSendNotification] = useState(false);

  const handleToggleNotification = () => {
    setSendNotification((prev) => !prev);
  };

  const handleCreateEmployee = () => {
    navigate("/crafted/account/settings");
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
      {/* HEAD */}
      <div className='card card-xl-stretch mb-5 mb-xl-8'>
        <div className='card-header border-0'>
          <h3 className='card-title fw-bold text-dark'>Talep Onay Süreci</h3>
          <div className='card-toolbar'>
            {/* BUTTON */}
            <button
              type='button'
              className='btn btn-sm btn-icon btn-color-danger btn-active-light-danger'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <KTSVG path='/media/icons/duotune/general/gen012.svg' className='svg-icon-2' />
            </button>
            <Dropdown1 />
          </div>
        </div>
        <div className='card-body pt-0'>
          {/* WAİT */}
          <div className='d-flex align-items-center bg-light-warning rounded p-5 mb-7'>
            <span className='svg-icon svg-icon-warning me-5'>
              <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
            </span>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                Mehmet Emin BECEK
              </a>
              <span className='text-muted fw-semibold d-block'>Açıklama : Açıklama Bekleniyor</span>
            </div>
            <span className='fw-bold text-warning py-1'>Bekleniyor</span>
          </div>
          {/* SUCCESS */}
          <div className='d-flex align-items-center bg-light-success rounded p-5 mb-7'>
            <span className='svg-icon svg-icon-success me-5'>
              <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
            </span>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                Mustafa Emirhan YILDIZ
              </a>
              <span className='text-muted fw-semibold d-block'>Açıklama : Bu son izin hakkın</span>
            </div>
            <span className='fw-bold text-success py-1'>Onaylandı</span>
          </div>
          {/* DENİED */}
          <div className='d-flex align-items-center bg-light-danger rounded p-5 mb-7'>
            <span className='svg-icon svg-icon-danger me-5'>
              <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
            </span>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                Burakhan Kurt
              </a>
              <span className='text-muted fw-semibold d-block'>Açıklama: İzin aldığın tarih aralığında proje bitiriş tarihi var!</span>
            </div>
            <span className='fw-bold text-danger py-1'>Reddedildi</span>
          </div>
          {/* END */}
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { TimeLineToPermissionInfoModal };
