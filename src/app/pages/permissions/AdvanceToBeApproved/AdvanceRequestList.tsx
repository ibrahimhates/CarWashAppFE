import moment from "moment";
import { IAdvanceRequest } from "../PermissionPage";

type Props = {
  advanceRequests: IAdvanceRequest[]
  showClicked: (id: string, name: string) => void
  getBy: string
}

function AdvanceRequestList({ advanceRequests, showClicked, getBy }: Props) {
  return (
    <tbody role='button'>
      {advanceRequests.map((current: IAdvanceRequest) => {
        if (current.approvalState === getBy) {
          return (
            <tr key={current.id} onClick={() => showClicked(current.id, current.name)}>
              <td className='text-dark fw-bold'>{current.name}</td>
              <td>{moment(current.deliveryDate).format('YYYY-MM-DD')}</td>
              <td>{current.amount}</td>
              <td>{current.description}</td>
              <td>{'Default'}</td>
              <td>
                <span
                  className={
                    'sizeList badge badge-light-' +
                    (current.approvalState == 'Onaylandı'
                      ? 'success'
                      : current.approvalState == 'Bekleniyor'
                        ? 'warning'
                        : 'danger')
                  }
                >
                  {current.approvalState}
                </span>
              </td>
            </tr>
          )
        }
        return null;
      })}
    </tbody>
  )
}

export default AdvanceRequestList;