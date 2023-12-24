import { useEffect, useState } from "react";
import HttpService from "../../../../services/HttpService";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Employee } from "../../EmployeesPage";
import { customJwtDecode } from "../../../../CustomJwt";

interface DecodedToken {
  CompanyId: string;
  CompanyName: string;
}

interface Unit {
  id: string;
  name: string;
  units: Units[];
}

interface Units {
  id: string;
  name: string;
}

interface DropdownEmployeesProps {
  employees: Employee[]
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>

}

interface UnitFilter {
  companyId: string;
  unitIds: string[];
}


export function DropdownEmployees({ employees, setEmployees }: DropdownEmployeesProps) {
  const [allUnits, setAllUnits] = useState<Unit[]>([]);
  const [data, setData] = useState<UnitFilter>({
    companyId: "",
    unitIds: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token: any = Cookies.get("authToken");
        const decodedToken: DecodedToken = customJwtDecode(token);
        const companyId = decodedToken.CompanyId;
        setData({ ...data, companyId: companyId });
        if (companyId) {
          const response = await HttpService.get(
            `Units/unitTypesWithUnits?companyId=${companyId}`
          );

          console.log(response.data)
          setAllUnits(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const updateUnitIdListData = (unitId: string, units: Unit) => {
    if (unitId === "") {
      setData({ ...data, unitIds: data.unitIds.filter((id) => units.units.find((unit) => unit.id === id) === undefined) });
    } else {
      setData({ ...data, unitIds: [...data.unitIds.filter((id) => units.units.find((unit) => unit.id === id) === undefined), unitId] });
    }
  }


  const handleApply = () => {

    HttpService.post(`User/filterByUnit`, data).then((res) => {
      setEmployees(res.data)
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });


  };

  return (
    <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true">
      <div className="px-7 py-5">
        <div className="fs-5 text-dark fw-bolder">Birimleri Filtrele</div>
      </div>
      <div className="separator border-gray-200"></div>
      <div className="px-7 py-5 ">

        {allUnits.map((units, index) => (
          <div className="mb-10 d-flex" key={index}>
            <label className="form-label fw-bold mt-3 me-5">{units.name}</label>
            <div className="ms-auto">
              <select
                className="form-select form-select-solid bg-light-primary cursor-pointer"
                onChange={(event) => updateUnitIdListData(event.target.value, units)}
                style={{ width: "160px" }}
                value={data.unitIds[index]}
              >
                <option value="">Seçiniz</option>
                {units.units.map(unit => (
                  <option key={unit.id} value={unit.id} className="text-dark">
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-end">
          <button
            type="reset"
            className="btn btn-sm btn-light btn-active-light-primary me-2"
            data-kt-menu-dismiss="true"
          >
            İptal
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            data-kt-menu-dismiss="true"
            onClick={handleApply}
          >
            Uygula
          </button>
        </div>
      </div>
    </div>
  );
}
