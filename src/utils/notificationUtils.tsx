import { toast } from 'react-toastify';

export const handleError = (message: string) => {
  toast(message, { type: toast.TYPE.ERROR, autoClose: false });
  // TODO : intégration de crashlytics
}