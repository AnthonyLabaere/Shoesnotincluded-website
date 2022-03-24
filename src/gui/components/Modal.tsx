import ReactModal from 'react-modal';
import { useMediaQuery } from 'react-responsive';

import * as Constants from "../../constants";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentLabel: string;
  children: JSX.Element | JSX.Element[];
}

const getModalStyle = (isMobile: boolean) => {
  const style: any = {
    content: {
      top: '50%',
      right: 'auto',
      bottom: 'auto',
    }
  }

  if (isMobile) {
    style.content.width = '50%';
  } else {
    style.content.left = '50%';
    style.content.marginRight = '-50%';
    style.content.transform = 'translate(-50%, -50%)';
  }

  return style;
}

const Modal = ({ isOpen, onClose, contentLabel, children }: ModalProps) => {
  const isMobile = useMediaQuery({ maxWidth: Constants.DEVICE_SIZES.mobileXL });

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={getModalStyle(isMobile)}
      contentLabel={contentLabel}
      ariaHideApp={false}>
      {children}
    </ReactModal>
  )
}
export default Modal
