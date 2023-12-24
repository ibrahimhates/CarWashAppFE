import { useEffect } from 'react'
import HttpService from '../../../../services/HttpService'
import Cookies from 'js-cookie'
import UnitListForDetail from './UnitForDetail/UnitListForDetail'
import { UnitType } from '../../SettingRoute'

interface DecodedToken {
  CompanyId: string
}


type Props = {
  unitTypes: UnitType[];
  setUnitTypes: (data: UnitType[]) => void;
  companyId: string;
  role: string
}

const UnitsListCard = ({ unitTypes, setUnitTypes, companyId, role }: Props) => {
  const countUnitType = unitTypes.length

  useEffect(() => {
    const token = Cookies.get('authToken')
    HttpService.get(`Units/unitTypesWithUnits?companyId=${companyId}`, token)
      .then((res) => {
        setUnitTypes(res.data)
        console.log("veri feldi", res.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <div className='card col-md-7'>
      <div className='card-header'>
        <h3 className='card-title fw-bolder fs-5 m-0'>Birimler</h3>
      </div>
      {unitTypes && Array.from({ length: unitTypes.length }).map((_, index) => {
        return (
          unitTypes.map((unitType) => {
            if (unitType.queue === countUnitType - index) {
              return companyId && <UnitListForDetail role={role} unitType={unitType} companyId={companyId} />
            }
            return null
          })
        )
      }
      )}
    </div>
  )
}

export default UnitsListCard
