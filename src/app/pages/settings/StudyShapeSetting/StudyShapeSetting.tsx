import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import HttpService from '../../../services/HttpService'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { showNotification } from '../../../actions/notificationAction'
import { customJwtDecode } from '../../../CustomJwt'

interface StudyShape {
  id: string
  companyId: string
  name: string
  description: string
}
interface DecodedToken {
  CompanyId: string
  Role: string
}

const StudyShapeSetting = () => {
  const token: any = Cookies.get('authToken')
  const decodedToken: DecodedToken = customJwtDecode(token)
  const companyId = decodedToken.CompanyId
  const role = decodedToken.Role
  const [studyShapes, setStudyShapes] = useState<StudyShape[]>([])
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const [studyShape, setStudyShape] = useState<StudyShape>({
    id: crypto.randomUUID(),
    companyId: companyId,
    name: '',
    description: '',
  })

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await HttpService.get(`StudyShape/all/${companyId}`)
        setStudyShapes(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchEmployee()
  }, [])

  const updateDatas = (fieldsToUpdate: Partial<StudyShape>) => {
    const updated = { ...studyShape, ...fieldsToUpdate }
    setStudyShape(updated)
  }

  const create = async () => {
    setLoading(true);
    try {
      const response = await HttpService.post(
        'StudyShape/create',
        studyShape,
        Cookies.get('authToken')
      )
      const newStudyShape = response.data // Yeni oluşturulan çalışma şekli
      setStudyShapes([...studyShapes, newStudyShape]) // Mevcut liste üzerine yeni çalışma şeklini ekleyin
      setStudyShape({
        id: crypto.randomUUID(),
        companyId: companyId,
        name: '',
        description: '',
      }) // Formu sıfırlayın
      dispatch(showNotification({ type: 'success', message: 'Calisma sekli basarili bir sekilde olusturuldu' }))
    } catch (err) {
      dispatch(showNotification({ type: 'error', message: 'Calisma sekli eklenirken hata ile karsilasindi' }))
      console.error('Hata:', err)
    }
    setLoading(false);
  }

  return (
    <div className='d-flex align-items-start '>
      <div tabIndex={-1} aria-hidden='true' className='card col-md-4 '>
        {role === 'HesapSahibi' && <>
          <div className='card-header'>
            <h3 className='card-title fw-bolder fs-5 m-0'>Calisma Sekli Ekle</h3>
          </div>
          <div className='modal-body py-lg-10 px-lg-10'>
            <form id='create_unit_form'>
              <div className='row g-5'>
                <div className='col-xl-12'>
                  <div className='fv-row mb-10'>
                    <label className=' fw-bold fs-6 mb-2'>Isim</label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='Calisma sekli'
                      name='name'
                      value={studyShape.name}
                      onChange={(e) => updateDatas({ name: e.target.value })}
                    />
                  </div>
                </div>
                <div className='col-xl-12'>
                  <div className='fv-row mb-10'>
                    <label className=' fw-bold fs-6 mb-2'>Aciklama</label>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='Acikalma'
                      name='desc'
                      value={studyShape.description}
                      onChange={(e) => updateDatas({ description: e.target.value })}
                    />
                  </div>
                </div>

                <div className='d-flex justify-content-end'>
                  <button type='button' className='btn btn-primary' onClick={create} disabled={loading}>
                    {!loading && <span className='indicator-label'>Oluştur</span>}
                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Lütfen bekleyin...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>}
      </div>
      <div className='col-md-1'></div>
      <div className='col-md-7'>
        <div className={`card h-md-100`}>
          <div className='card-header'>
            <h3 className='card-title fw-bolder fs-5 m-0'>Calisma Sekilleri</h3>
          </div>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                <thead>
                  <tr className='fw-bold text-muted'>
                    <th className='min-w-15px'>Isim</th>
                    <th className='min-w-150px'>Aciklama</th>
                    <th className='min-w-100px text-end'>Düzenle</th>
                  </tr>
                </thead>
                <tbody>
                  {studyShapes.map((shape) => (
                    <tr key={shape.id}>
                      <td>{shape.name}</td>
                      <td>{shape.description}</td>
                      <td className='text-end'>{/* Düzenle butonunu */}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyShapeSetting
