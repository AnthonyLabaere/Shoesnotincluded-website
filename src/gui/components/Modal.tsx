import React from 'react'
import ReactModal from 'react-modal'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  contentLabel: string
  children: JSX.Element | JSX.Element[]
}

const Modal = ({
  isOpen,
  onClose,
  contentLabel,
  children,
}: ModalProps): React.ReactElement => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '95%',
        },
      }}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  )
}
export default Modal
