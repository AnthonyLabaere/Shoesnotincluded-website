import ReactGA from 'react-ga'

const useAnalyticsEventTracker = (
  category: string
): ((action: string, label?: string) => void) => {
  const eventTracker = (action: string, label?: string): void => {
    ReactGA.event({ category, action, label })
  }
  return eventTracker
}

export default useAnalyticsEventTracker
