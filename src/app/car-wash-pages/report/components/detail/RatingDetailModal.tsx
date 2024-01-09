import {Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from 'react-bootstrap'
import React from 'react'
import RatingDetailListTable from './list/RatingDetailListTable'

type Props = {
  handleClose: () => void
  show: boolean
  userId: number
  name: string
}

const RatingDetailModal = ({handleClose, show, userId, name}: Props) => {
  return (
    <Modal
      id='create_position_modal'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-800px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <ModalHeader className='justify-content-center'>
        <ModalTitle>{name + ' Raporu'}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <RatingDetailListTable userId={userId} />
      </ModalBody>
    </Modal>
  )
}

export default RatingDetailModal
