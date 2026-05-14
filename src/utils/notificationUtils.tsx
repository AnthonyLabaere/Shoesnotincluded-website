import { toast } from 'react-toastify'

export const handleMessage = (message: string): void => {
  toast.info(message)
}

export const handleError = (message: string): void => {
  toast.error(message, { autoClose: false })
  // TODO : intégration de crashlytics
}
