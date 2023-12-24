import InfoBox from '../../../common/components/InfoBox'
import DragAndDropList from './DragAndDropList'

export interface UnitType {
  id: string
  name: string
  queue: number
}

const CompUnitsSettings = () => {
  return (
    <div className='card col-md-4'>
      <div className='card-header d-flex justify-content-start align-items-center'>
        <h3 className='card-title fw-bolder fs-5 m-0'>Birim Turleri</h3>
        <div style={{marginLeft: "1rem"}}>
          <InfoBox message='Buradan şirket yapısının hiyerarşik düzenini belirleyebilirsiniz'/>
        </div>
      </div>
      <div className='card-body'>
        <DragAndDropList />
      </div>
    </div>
  )
}

export default CompUnitsSettings
