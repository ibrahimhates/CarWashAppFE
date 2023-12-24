/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers';

const Step4Completed = () => {
  return (
    <>
      <div data-kt-stepper-element='content'>
        <div className='w-100 text-center'>
          {/* begin::Heading */}
          <h1 className='fw-bold text-dark mb-3'>Şirketi Oluşturma</h1>
          {/* end::Heading */}

          {/* begin::Description */}
          <div className='text-muted fw-semibold fs-3'>
          Şirket oluşturmak  için aşağıdaki butona tıklayın.
          </div>
          {/* end::Description */}

          {/* begin::Illustration */}
          <div className='text-center px-4 py-15'>
            <img
              src={toAbsoluteUrl('/media/illustrations/unitedpalms-1/2.png')}
              alt=''
              className='mw-100 mh-300px'
            />
          </div>
          {/* end::Illustration */}
        </div>
      </div>
    </>
  );
};

export { Step4Completed };

export {};
