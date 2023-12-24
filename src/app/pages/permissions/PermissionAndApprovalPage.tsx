import { Link, useLocation } from "react-router-dom";

export default function PermissionAndApprovalPage() {
  const location = useLocation()


  return (
    <div className='card mb-10'>
      <div className='card-body pt-3 pb-0'>
        <div className='d-flex overflow-auto h-45px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/requests/permission` && 'active')
                }
                to={`permission`}
              >
                Izin Talepleri
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/requests/advances` && 'active')
                }
                to={`advances`}
              >
                Avans Talepleri
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/requests/myrequest` && 'active')
                }
                to={`myrequest`}
              >
                Taleplerim
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
