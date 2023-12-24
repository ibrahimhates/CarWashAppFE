import { useEffect, useMemo, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import HttpService from '../../../services/HttpService'
import ListItem from './ListItem'
import { UnitType } from './CompUnitsSettings'
import { useDispatch } from 'react-redux'
import { showNotification } from '../../../actions/notificationAction'
import { customJwtDecode } from '../../../CustomJwt'

interface DecodedToken {
  CompanyId?: string
  Role: string
}

const DragAndDropList = () => {
  const [unitTypes, setUnitTypes] = useState<UnitType[]>([])
  const [unitTypesSeed, setUnitTypesSeed] = useState<UnitType[]>([])
  const [isUpdated, setIsUpdated] = useState(false)
  const token: any = Cookies.get('authToken')
  const decodedToken: DecodedToken = customJwtDecode(token)
  const companyId = decodedToken.CompanyId;
  const role = decodedToken.Role;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const updateUnitTypeDatas = (idToUpdate: string, fieldsToUpdate: Partial<UnitType>) => {
    setUnitTypes((prevUnitTypes) => {
      const updatedUnitTypes = prevUnitTypes.map((unitType) => {
        if (unitType.id === idToUpdate) {
          return { ...unitType, ...fieldsToUpdate }
        }
        return unitType
      })
      return updatedUnitTypes
    })
  }

  const deleteUnitType = (idToDelete: string) => {
    setUnitTypes((prevUnitTypes) => prevUnitTypes.filter((unitType) => unitType.id !== idToDelete))
  }

  const handleAddUnitType = () => {
    // Yeni bir UnitType oluşturun ve unitTypes dizisine ekleyin
    const newUnitType: UnitType = {
      id: crypto.randomUUID(),
      name: '',
      queue: 0,
    }
    setUnitTypes([...unitTypes, newUnitType])
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (companyId) {
          const response = await HttpService.get(`Units/unittype?companyId=${companyId}`)
          console.log(response.data)
          setUnitTypes(response.data)
          setUnitTypesSeed(response.data)
        } else {
          console.log('CompanyId not found in token.')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])

  const post = () => {
    setLoading(true);
    HttpService.post(`UnitTypes/createorupdate`, unitTypes, Cookies.get('authToken'))
      .then(() => {
        setLoading(false)
        setIsUpdated(false)
        dispatch(showNotification({ type: 'success', message: 'Birim turleri basarili bir sekilde guncellendi' }))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        dispatch(showNotification({ type: 'error', message: 'Birim turleri guncellenirken hata ile karsilandi' }))
      })
  }
  const checkAndUpdate = () => {
    if (isUpdated) {
      post()
    }
    setIsUpdated(true);
  }
  const onDragEnd = (result: any) => {
    const newItems = Array.from(unitTypes)
    const [removed] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, removed)
    setUnitTypes(newItems)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided) => (
          <div className='col-md-12' {...provided.droppableProps} ref={provided.innerRef}>
            {unitTypes.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
                isDragDisabled={!isUpdated}
              >
                {(provided, snapshot) => (
                  <ListItem
                    provided={provided}
                    snapshot={snapshot}
                    item={item}
                    index={index}
                    updateUnitTypeDatas={updateUnitTypeDatas}
                    deleteUnitType={deleteUnitType}
                    show={isUpdated}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {isUpdated && (
              <div className='text-center mt-8 cursor-pointer EKLE ' onClick={handleAddUnitType}>
                <KTSVG path='/media/svg/add.svg' className='svg-icon-1' />
              </div>
            )}

            <div className='d-flex justify-content-end mt-10'>
              <div className='d-flex justify-content-center'>
                {isUpdated && (
                  <button
                    type='button'
                    className='btn btn-secondary me-3'
                    onClick={() => {
                      console.log(unitTypesSeed)
                      setUnitTypes(unitTypesSeed)
                      setIsUpdated(false)
                      console.log(`aa`, unitTypes)
                    }}
                  >
                    İptal Et
                  </button>
                )}

                {role === 'HesapSahibi' &&
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={checkAndUpdate}
                  >
                    {!loading && <span className='indicator-label'>{isUpdated ? `Kaydet` : `Duzenle`}</span>}
                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Kaydediliyor...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>}
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragAndDropList
