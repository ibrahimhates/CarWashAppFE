import {Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from 'react-bootstrap'
import React from 'react'
import RatingDetailListTable from './list/RatingDetailListTable'

type Props = {
  handleClose:() => void;
  show:boolean;
}

const RatingDetailModal = ({handleClose,show}:Props) => {
  return(
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
        <ModalTitle>Rapor</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <RatingDetailListTable/>
      </ModalBody>
    </Modal>
  )
}

export default RatingDetailModal;