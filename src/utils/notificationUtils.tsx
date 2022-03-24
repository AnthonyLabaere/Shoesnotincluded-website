import { toast } from 'react-toastify';

export const handleMessage = (message: string) => {
  toast(message, { type: toast.TYPE.INFO });
}

export const handleError = (message: string) => {
  toast(message, { type: toast.TYPE.ERROR, autoClose: false });
  // TODO : intégration de crashlytics
}