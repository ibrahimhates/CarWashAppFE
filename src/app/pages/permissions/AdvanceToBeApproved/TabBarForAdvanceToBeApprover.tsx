import Cookies from 'js-cookie'
import HttpService from '../../../services/HttpService'
import { IAdvanceRequest, ILeaveRequest } from '../PermissionPage'
import { useEffect } from 'react'
import AdvanceRoute from './AdvanceRoute'

type Props = {
  advanceRequests: IAdvanceRequest[]
  setAdvanceRequests: (all: IAdvanceRequest[]) => void
}

const TabBarForAdvanceToBeApprover = ({ advanceRequests, setAdvanceRequests }: Props) => {

  const getAllAdvanceRequest = () => {
    HttpService.get('AdvanceRequest/allHaveBeen', Cookies.get('authToken'))
      .then((response) => {
        setAdvanceRequests(response.data)
        console.log(response.data)
      })
      .then(() => {
        console.log('veri geldi')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getAllAdvanceRequest()
  }, [])

  return (
    <div className={`card card-xl-stretch mb-xl-8rd`}>
      <div className='card-header border-1'>
        <div className='card-toolbar'>
          <ul className='nav'>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-color-muted btn-active btn-active-secondary active fw-bold px-4 me-1'
                data-bs-toggle='tab'
                href='#tab_1'
              >
                Onay Bekleyenler
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-color-muted btn-active btn-active-secondary fw-bold px-4 me-1'
                data-bs-toggle='tab'
                href='#tab_2'
              >
                Onaylananlar
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-color-muted btn-active btn-active-secondary fw-bold px-4'
                data-bs-toggle='tab'
                href='#tab_3'
              >
                Reddedilenler
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='card-body py-3'>
        <div className='tab-content'>
          <div className='tab-pane fade show active' id='tab_1'>
            <div className='table-responsive'>
              <AdvanceRoute
                advanceRequests={advanceRequests}
                getAllAdvanceRequest={getAllAdvanceRequest}
                getBy={'Bekleniyor'}
              />
            </div>
          </div>
          <div className='tab-pane fade' id='tab_2'>
            <div className='table-responsive'>
              <AdvanceRoute
                advanceRequests={advanceRequests}
                getAllAdvanceRequest={getAllAdvanceRequest}
                getBy={'Onaylandı'}
              />
            </div>
          </div>
          <div className='tab-pane fade' id='tab_3'>
            <div className='table-responsive'>
              <AdvanceRoute
                advanceRequests={advanceRequests}
                getAllAdvanceRequest={getAllAdvanceRequest}
                getBy={'Reddedildi'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabBarForAdvanceToBeApprover;
