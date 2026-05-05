declare global {
  interface Window {
    gtag?: (
      command: 'event',
      action: string,
      params?: { event_category?: string; event_label?: string }
    ) => void
  }
}

const useAnalyticsEventTracker = (
  category: string
): ((action: string, label?: string) => void) => {
  const eventTracker = (action: string, label?: string): void => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      })
    }
  }
  return eventTracker
}

export default useAnalyticsEventTracker
