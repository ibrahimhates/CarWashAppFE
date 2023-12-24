import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import moment from 'moment/moment'
import Cookies from 'js-cookie'
import HttpService from '../../../../../services/HttpService'
import { useDispatch } from 'react-redux'
import { showNotification } from '../../../../../actions/notificationAction'
import { Position, StudyShape, UnitForPosition, UnitType } from '../EmployeePosition'
import { KTSVG } from '../../../../../../_metronic/helpers'
import { useTranslation } from 'react-i18next'

interface CreatedPosition {
	positionBeginDate: string
	endPositionDate: string
	studyShapeId: string
	units: UnitForPosition[]
}

type Props = {
	show: boolean
	userId: any
	handleClose: () => void
	setEmployeePosition: () => void
	positions: Position[]
	studyShapes: StudyShape[]
	unitTypes: UnitType[]
	unitEmptyIds: UnitForPosition[]
}

const modalsRoot = document.getElementById('root-modals') || document.body

const PositionCreateModal = (
	{ userId, show, handleClose, setEmployeePosition, positions, studyShapes, unitTypes, unitEmptyIds }: Props,
	{ }
) => {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)

	const [position, setPositionData] = useState<CreatedPosition>({
		positionBeginDate: '',
		endPositionDate: '',
		studyShapeId: '',
		units: unitEmptyIds,
	})

	const [unitIds, setUnitIds] = useState<UnitForPosition[]>([])
	const updatePositionData = (fieldsToUpdate: Partial<CreatedPosition>) => {
		const updatedData = { ...position, ...fieldsToUpdate }
		setPositionData(updatedData)
	}

	const handlerUnitId = (unitId: string, index: number) => {
		console.log(unitId, index);
		const unitforUpdate = [...unitIds]
		unitforUpdate[index] = { id: unitId }
		setUnitIds(unitforUpdate)
	}

	const getConflictPosition = (id: string) => {
		const conflict = positions.find((item) => item.id === id)
		return {
			beginDate: conflict?.positionBeginDate || '',
			endDate: conflict?.endPositionDate || '',
		}
	}

	const clearInValidData = () => {
		const filterIds = unitIds.filter((item) => item && item.id !== '')

		// console.log('filterIds', unitIds)
		updatePositionData({ units: filterIds })
	}

	const { t } = useTranslation()


	const create = () => {
		setLoading(true)
		HttpService.post(`UserPosition/create?userId=${userId}`, position, Cookies.get('authToken'))
			.then(() => {
				console.log(`create`)
				setLoading(false)
				setEmployeePosition()
				handleClose()
				dispatch(showNotification({ type: 'success', message: 'Pozisyon Eklendi' }))
			})
			.catch((err) => {
				setLoading(false)
				const message = t(
					`POSITION.ERRORS.CREATE.${err.response.data.errorCode}`
				)

				console.log(message)

				if (err.response.data && err.response.data.errorCode === 'EP001') {
					const conflictPositionId = err.response.data.data.id
					const c = getConflictPosition(conflictPositionId)

					let messageText = message

					if (c?.beginDate) {
						messageText += ' Başlangıç: ' + moment(c.beginDate).format('DD-MM-YYYY')
					}

					if (c?.endDate) {
						messageText += ' Bitiş: ' + moment(c.endDate).format('DD-MM-YYYY')
					}

					dispatch(
						showNotification({
							type: 'error',
							message: messageText,
						})
					)
				} else {
					dispatch(
						showNotification({
							type: 'error',
							message: message,
						})
					)
				}
			})
	}

	useEffect(() => {
		clearInValidData()
	}, [unitIds])

	return createPortal(
		<Modal
			id='create_position_modal'
			tabIndex={-1}
			aria-hidden='true'
			dialogClassName='modal-dialog modal-dialog-centered mw-700px'
			show={show}
			onHide={handleClose}
			backdrop={true}
		>
			<div className='modal-header'>
				<h2>Pozisyon Ekle</h2>
				<button type="button" className='btn-close'
					onClick={handleClose}
				/>
			</div>

			<div className='modal-body py-lg-10 px-lg-10'>
				<form id='create_employee_form'>
					<div className='row g-5'>
						{unitTypes &&
							unitTypes.map((ut) => {
								return (
									<div key={ut.id} className='col-md-6'>
										<div className='mb-5'>
											<label className='form-label'>{ut.name}</label>
											<select
												className='form-select'
												name='unit'
												onChange={(e) => handlerUnitId(e.target.value, ut.queue - 1)}
											>
												<option value='' selected={true}>
													Lutfen {ut.name} seciniz
												</option>
												{ut.units.map((unit) => (
													<option key={unit.id} value={unit.id}>
														{unit.name}
													</option>
												))}
											</select>
										</div>
									</div>
								)
							})
						}
						{unitTypes && unitTypes.length % 2 !== 0 && <div className='col-md-6'></div>}
						<div className='col-md-6'>
							<div className='mb-5'>
								<label className='form-label'>Calisma Sekli</label>

								<select
									className='form-control'
									name='studyShape'
									onChange={(e) => updatePositionData({ studyShapeId: e.target.value })}
								>
									<option value=''>Lutfen Calisma Sekli seciniz</option>
									{studyShapes &&
										studyShapes.map((shape) => (
											<option
												key={shape.id}
												value={shape.id}
											>
												{shape.name}
											</option>
										))}
								</select>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='mb-5'></div>
						</div>
						<div className='col-md-6'>
							<div className='mb-5'>
								<label className='form-label'>{'Başlangıç Tarihi'}</label>
								<input
									type='date'
									className='form-control'
									name='begin'
									value={moment(position.positionBeginDate).format('YYYY-MM-DD')}
									onChange={(e) => updatePositionData({ positionBeginDate: e.target.value })}
								/>
							</div>
						</div>

						<div className='col-md-6'>
							<div className='mb-5'>
								<label className='form-label'>Bitis Tarihi</label>
								<input
									type='date'
									className='form-control'
									name='end'
									value={moment(position.endPositionDate).format('YYYY-MM-DD')}
									onChange={(e) => updatePositionData({ endPositionDate: e.target.value })}
								/>
							</div>
						</div>

						<div className='d-flex justify-content-end'>
							<button type='button' className='btn btn-danger me-3' onClick={handleClose}>
								İptal Et
							</button>
							<button type='button' className='btn btn-primary' onClick={create}>
								{!loading && (
									<span className='indicator-label'>
										Oluştur
									</span>
								)}
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
			</div >
		</Modal >,
		modalsRoot
	)
}

export default PositionCreateModal
