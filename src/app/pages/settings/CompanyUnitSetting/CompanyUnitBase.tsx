import { UnitType } from '../SettingRoute';
import CompUnitsSettings from './CompUnitsSettings';
import UnitsListCard from './UnitListCard/UnitsListCard'


type Props = {
  unitTypes:UnitType[];
  setUnitTypes:(data:UnitType[]) => void;
  companyId:string;
  role:string
}

const CompanyUnitBase = ({unitTypes,setUnitTypes,companyId,role}:Props) => {
  return (
    <div className='d-flex align-items-start'>
      <CompUnitsSettings/>
      <div className='col-md-1'></div>
      <UnitsListCard role={role} companyId={companyId} unitTypes={unitTypes} setUnitTypes={setUnitTypes}/>
    </div>
  )
}

export default CompanyUnitBase
