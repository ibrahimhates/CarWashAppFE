import { useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import HttpService from '../../../../services/HttpService'
import Cookies from 'js-cookie'
import CreateNewPermissionForm from './CreateNewPermissionForm'
import { useTranslation } from 'react-i18next'

export interface IRequestPermissionData {
    totalDays: number
    startDate: any
    endDate: any
    description: string
    isProcessed: boolean
    isApproved: boolean
}

type Props = {
    show: boolean
    handleClose: () => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateNewRequestPermissionModal = ({ show, handleClose }: Props) => {
    const { t } = useTranslation();

    useLayoutEffect(() => {
    }, [show])

    return createPortal(
        <Modal
            id='create_employee_modal'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-500px'
            show={show}
            onHide={handleClose}
            backdrop={true}
        >
            <div className='modal-header d-flex justify-content-start'>
                <h2>{t('REQUESTPERMISSION.PAGE.CREATE.PERMISSION.TITLE')}</h2>
            </div>

            <div className='modal-body py-lg-10 px-lg-10 d-flex justify-content-center'>
                <CreateNewPermissionForm handleClose={handleClose} />
            </div>
        </Modal>,
        modalsRoot
    )
}

export { CreateNewRequestPermissionModal }
